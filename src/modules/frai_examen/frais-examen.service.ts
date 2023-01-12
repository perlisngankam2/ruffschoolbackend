import {
    Collection,
    Entity,
    EntityManager,
    EntityRepository,
    Enum,
    Filter,
    FilterQuery,
    IdentifiedReference,
    ManyToOne,
    NotFoundError,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FraisExamen } from 'src/entities/frais-exament.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { FraisExamentInput } from './dto/frais-exament.input';
import { UpdateFraisExamentInput } from './dto/frais-exament.update';

@Entity()
@ObjectType()
export class FraisExamenService {
    constructor(
        @InjectRepository(FraisExamen)
        private fraisRepository: EntityRepository<FraisExamen>,
        // private niveauService: NiveauEtudeService,
        private salleService: SalleService,
        private anneAccademique: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: FraisExamentInput,
      ): Promise<FraisExamen> {  
        const frais = new FraisExamen()

        const anneAccademique = input.anneeAccademique
            ? await this.anneAccademique.findByOne({id:input.anneeAccademique.ID})
            : await this.anneAccademique.create(input.anneeAccademique)

        // const niveauEtude = input.niveauEtude
        //     ? await this.salleService.findByOne({id:input.niveauEtude.ID})
        //     : await this.salleService.create(input.niveauEtude)

        const salle = input.salle
            ? await this.salleService.findByOne({id:input.salle.ID})
            : await this.salleService.create(input.salle)



        frais.montant = input.montant
        frais.description = input.description || null
        frais.salle.id = salle.id
        frais.anneeAccademique.id = anneAccademique.id
        
        await this.fraisRepository.persistAndFlush(frais)
        return frais
      }
    
      findByOne(filters: FilterQuery<FraisExamen>): Promise<FraisExamen | null> {
        return this.fraisRepository.findOne(filters);
      }
      findById(id:string){
        return this.fraisRepository.findOne(id)
      }
    
      getAll(): Promise<FraisExamen[]> {
        return this.fraisRepository.findAll()
      }
      
      async update(frais: FraisExamen, input: UpdateFraisExamentInput): Promise<FraisExamen> {
        if (input.salle) {
            const salle =
            input.salle?.ID &&
              (await this.salleService.findByOne({ id: input.salle?.ID }));
      
            if (!salle) {
              throw new NotFoundError('salle no exist' || '');
            }
            this.salleService.update(salle, input.salle);
          }

          if (input.anneeAccademique) {
            const annee =
            input.anneeAccademique?.ID &&
              (await this.anneAccademique.findByOne({ id: input.anneeAccademique?.ID }));
      
            if (!annee) {
              throw new NotFoundError('annee no exist' || '');
            }
            this.anneAccademique.update(annee, input.anneeAccademique);
          }
        
        wrap(frais).assign({
            montant: input.montant || frais.montant,
            description: input.description || frais.description,
            dateLine: input.dateLine || frais.dateLine
        },
        { em: this.em },
    );
        await this.fraisRepository.persistAndFlush(frais);
        return frais;
      }
      async deletePrime(){
        
      }   
}
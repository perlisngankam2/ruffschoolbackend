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
import { Pension } from 'src/entities/pension.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleService } from '../salle/salle.service';
import { PensionCreateInput } from './dto/pension.input';
import { PensionUpdateInput } from './dto/pension.update';

@Entity()
@ObjectType()
export class PensionService {
    constructor(
        @InjectRepository(Pension)
        private pensionRepository: EntityRepository<Pension>,
        private salleService: SalleService,
        private anneAccademique: AnneeAccademiqueService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: PensionCreateInput,
      ): Promise<Pension> {  
        const pension = new Pension()

        const anneAccademique = input.anneeAccademique
            ? await this.anneAccademique.findByOne({id:input.anneeAccademique.ID})
            : await this.anneAccademique.create(input.anneeAccademique)

        const salle = input.salle
            ? await this.salleService.findByOne({id:input.salle.ID})
            : await this.salleService.create(input.salle)


        pension.montant = input.montant
        pension.name = input.name
        pension.description = input.description || null
        pension.salle.id = salle.id
        pension.anneeAccademique.id = anneAccademique.id
        
        await this.pensionRepository.persistAndFlush(pension)
        return pension
      }
    
      findByOne(filters: FilterQuery<Pension>): Promise<Pension | null> {
        return this.pensionRepository.findOne(filters);
        }
      findById(id:string){
        return this.pensionRepository.findOne(+id)
        }
    
      getAll(): Promise<Pension[]> {
        return this.pensionRepository.findAll()
      }
      
      async update(pension: Pension, input: PensionUpdateInput): Promise<Pension> {
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
        
        wrap(pension).assign({
            name:input.name || pension.name,
            montant: input.montant || pension.montant,
            description: input.description || pension.description,
            dateLine: input.dateLine || pension.dateLine
        },
        { em: this.em },
    );
        await this.pensionRepository.persistAndFlush(pension);
        return pension;
      }
      async deletePrime(){
        
      }   
}
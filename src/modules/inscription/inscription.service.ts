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
    PopulateHint,
    PrimaryKey,
    Property,
    Unique,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { forwardRef, Inject } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { Inscription } from 'src/entities/inscription.entity';
import { AnneeAccademiqueService } from '../anne_accademique/anne-accademique.service';
import { AvanceInscriptionService } from '../avance-inscription/avance-inscription.service';
import { FraisInscriptionService } from '../frais-inscription/frais-inscription.service';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { StudentService } from '../student/student.service';
import { InscriptionUpdateInput } from './dto/incription.update';
import { InscriptionInput } from './dto/inscription.input';

@Entity()
@ObjectType()
export class InscriptionService {
    constructor(
        @InjectRepository(Inscription)
        private inscriptionRepository: EntityRepository<Inscription>,
        // private salleService: NiveauEtudeService,
        private anneAccademique: AnneeAccademiqueService,
        @Inject(forwardRef(() => AvanceInscriptionService))
        private avanceInscription: AvanceInscriptionService,
        private studentService: StudentService,
        private fraisService:FraisInscriptionService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: InscriptionInput,
      ): Promise<Inscription> {  
        const inscription = new Inscription()

        const anneAccademique = input.anneeAccademique
            ? await this.anneAccademique.findByOne({id:input.anneeAccademique.ID})
            : await this.anneAccademique.create(input.anneeAccademique)

        const student = input.student
            ? await this.studentService.findByOne({id:input.student.ID})
            : await this.studentService.create(input.student)

        const frais = input.fraisInscription
            ? await this.fraisService.findByOne({id:input.fraisInscription.ID})
            : await this.fraisService.create(input.fraisInscription)
        

        inscription.montant = input.montant
        inscription.description = input.description || null
        inscription.anneeAccademique.id = anneAccademique.id
        inscription.fraisInscription.id = frais.id
        inscription.student.id = student.id

        // check last avance if the reste == 0 close inscription

        // check categorie Student and get if he has the reduction for inscription
        const categorie_student = student.categorie.getEntity()
        const retenu_categorie = categorie_student.reductionScolarite.getEntity()
  
        if(retenu_categorie.pourcentage != 0){
            const new_amount_incription =frais.montant - retenu_categorie.pourcentage*frais.montant 
            if(inscription.montant !== new_amount_incription){
                // create the avance inscription
                await this.avanceInscription.saveAvanceTranche(inscription,new_amount_incription)
            }
            inscription.complete = true
            await this.inscriptionRepository.persistAndFlush(inscription)
            return inscription
          }

        if(retenu_categorie.montant != 0 ){
            const new_amount_incription =frais.montant - retenu_categorie.montant 
            if(inscription.montant !== new_amount_incription){
                // create the avance inscription  
                await this.avanceInscription.saveAvanceTranche(inscription,new_amount_incription)
            } 
            inscription.complete = true
            await this.inscriptionRepository.persistAndFlush(inscription)
            return inscription
        }
        if(input.montant !== frais.montant){
            // create avance inscription
            const new_amount_incription = 0
            await this.avanceInscription.saveAvanceTranche(inscription,new_amount_incription)
        }
        inscription.complete = true
        await this.inscriptionRepository.persistAndFlush(inscription)
        return inscription
      }
    
      findByOne(filters: FilterQuery<Inscription>): Promise<Inscription | null> {
        return this.inscriptionRepository.findOne(filters);
      }
      findById(id:number){
        return this.inscriptionRepository.findOne(id)
      }
    
      getAll(): Promise<Inscription[]> {
        return this.inscriptionRepository.findAll()
      }
      
    async findOrFailled(id:number):Promise<Inscription>{
        const inscription = await this.inscriptionRepository.findOneOrFail(id)
        return inscription
    }
    

    async update(inscription: Inscription, input: InscriptionUpdateInput): Promise<Inscription> {
        if (input.fraisInscription) {
            const fraisInscription =
            input.fraisInscription?.ID &&
              (await this.fraisService.findByOne({ id: input.fraisInscription?.ID }));
      
            if (!fraisInscription) {
              throw new NotFoundError('frais inscripton no exist' || '');
            }
            this.fraisService.update(fraisInscription, input.fraisInscription);
          }

        if (input.student) {
            const student =
            input.student?.ID &&
              (await this.studentService.findByOne({ id: input.student?.ID }));
      
            if (!student) {
              throw new NotFoundError('student no exist' || '');
            }
            this.studentService.update(student, input.student);
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
        
        wrap(inscription).assign({
            montant: input.montant || inscription.montant,
            description: input.description || inscription.description,
            name: input.name|| inscription.name,
        },
        { em: this.em },
        );
        await this.inscriptionRepository.persistAndFlush(inscription);
        return inscription;
    }

    async deletePrime(){
        
    }   

    async saveInscription(id:number,avance:AvanceInscription){
        const inscription = await this.inscriptionRepository.findOneOrFail(id)
        inscription.montant += avance.montant
        const student = inscription.student.getEntity()
        const categorie_student = student.categorie.getEntity()
        const retenu = categorie_student.reductionScolarite.getEntity()
        if(retenu.pourcentage != 0){
            const new_amount_incription =inscription.fraisInscription.getEntity().montant - retenu.pourcentage*inscription.fraisInscription.getEntity().montant
            if(inscription.montant == new_amount_incription){
                inscription.complete = true
            }
          }

        if(retenu.montant != 0 ){
            const new_amount_incription =inscription.fraisInscription.getEntity().montant - retenu.montant 
            if(inscription.montant == new_amount_incription){
                inscription.complete = true
            } 
        }
        
        if(inscription.montant == inscription.fraisInscription.getEntity().montant){
            inscription.complete = true
        }
        await this.inscriptionRepository.persistAndFlush(inscription)
    }
}
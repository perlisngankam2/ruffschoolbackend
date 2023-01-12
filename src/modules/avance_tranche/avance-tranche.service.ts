/* eslint-disable prettier/prettier */
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
import { forwardRef, Inject } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvanceTranche } from 'src/entities/avance-tranche.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentService } from '../tranche-student/tranche-student.service';
import { AvanceTrancheCreateInput } from './dto/avance-tranche.input';
import { AvanceTrancheUpdateInput } from './dto/avance-tranche.update';


@Entity()
@ObjectType()
export class AvanceTrancheService {
    constructor(
        @InjectRepository(AvanceTranche)
        private avanceTrancheRepository: EntityRepository<AvanceTranche>,
        @Inject(forwardRef(() => TrancheStudentService))
        private trancheStudent: TrancheStudentService,
        private  em: EntityManager,
      ) {}
    
    async createavancetranche(
        input: AvanceTrancheCreateInput,
      ): Promise<AvanceTranche> {  
        const avanceTranche = new AvanceTranche()

        const tranche = input.tranche
            ? await this.trancheStudent.findByOne({id:input.tranche.ID})
            : await this.trancheStudent.create(input.tranche)

        // check s'il y'a pas autre avance 
        const avance = tranche.avancheTranche
        if(avance.length != 0){
          const reste = avance.matching({orderBy:{'createdAt':{}}})[0].reste
          if(reste != 0){
            let newTranche = this.trancheStudent.saveTranche(tranche.id,avanceTranche)
          }
        }
        // check categorie student
        const student = tranche.student.getEntity()
        const reduction = student.categorie.getEntity().reductionScolarite.getEntity()
        
        if(reduction.pourcentage != 0){
          const newValue = tranche.tranche.getEntity().montant - tranche.tranche.getEntity().montant*reduction.pourcentage
          avanceTranche.reste = newValue - tranche.montant
          if(avanceTranche.reste == 0){
              avanceTranche.complete = true
          }
        }

        if(reduction.montant != 0){
          const newValue = tranche.tranche.getEntity().montant - reduction.montant
          avanceTranche.reste = newValue - tranche.montant
          if(avanceTranche.reste == 0){
            avanceTranche.complete = true
          }
        }

        avanceTranche.montant = input.montant
        avanceTranche.name = input.name
        avanceTranche.description = input.description
        avanceTranche.trancheStudent.id = tranche.id
        
        this.avanceTrancheRepository.persistAndFlush(avanceTranche)
        return avanceTranche
      }

    async saveAvanceTranche(tranche:TrancheStudent,new_tranche_amount:number){
        const avance = new AvanceTranche()

        avance.name = tranche.name
        avance.description = tranche.description
        avance.createdAt = tranche.createdAt
        avance.montant = tranche.montant
        avance.reste = new_tranche_amount - tranche.montant

        this.avanceTrancheRepository.persistAndFlush(avance)
        return avance
    }
    
    findByOneavancetranche(filters: FilterQuery<AvanceTranche>): Promise<AvanceTranche | null> {
        return this.avanceTrancheRepository.findOne(filters);
      }
    findByIdavancetranche(id:string){
        return this.avanceTrancheRepository.findOne(+id)
      }
    
    getAllavancetranche(): Promise<AvanceTranche[]> {
        return this.avanceTrancheRepository.findAll()
      }
    
      
    // async update(trancheStudent: TrancheStudent, input: AvanceTrancheUpdateInput): Promise<AvanceTranche> {
    //     if (input.tranche) {
    //         const tranche =
    //         input.tranche?.ID &&
    //           (await this.trancheService.findByOne({ id: input.tranche?.ID }));
      
    //         if (!tranche) {
    //           throw new NotFoundError('tranche no exist' || '');
    //         }
    //         this.trancheService.update(tranche, input.tranche);
    //     }

    //     if (input.student) {
    //         const student =
    //         input.student?.ID &&
    //           (await this.studentService.findByOne({ id: input.student?.ID }));
      
    //         if (!student) {
    //           throw new NotFoundError('student no exist' || '');
    //         }
    //         this.studentService.update(student, input.student);
    //     }
 
    //     wrap(trancheStudent).assign({
    //         name:input.name || trancheStudent.name,
    //         montant: input.montant || trancheStudent.montant,
    //         description: input.description || trancheStudent.description,
    //     },
    //     { em: this.em },
    //     );
    //     await this.avanceTrancheRepository.persistAndFlush(trancheStudent);
    //     return trancheStudent;
    // }

    // //  tous les etudiants etant à jour
    // async AllStudentComplet(){
    //     const student = await this.avanceTrancheRepository
    // }

    async delete(){}

}
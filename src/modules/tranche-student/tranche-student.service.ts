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
import { verify } from 'crypto';
import { TwilioService } from 'nestjs-twilio';
import { AvanceTranche } from 'src/entities/avance-tranche.entity';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { Tranche } from 'src/entities/tranche.entity';
import { AvanceTrancheService } from '../avance_tranche/avance-tranche.service';
import { StudentService } from '../student/student.service';
import { TrancheService } from '../tranche/tranche.service';
import { TrancheStudentCreateInput } from './dto/tranche-student.input';
import { TrancheStudentUpdateInput } from './dto/tranche-student.update';

@Entity()
@ObjectType()
export class TrancheStudentService {
    constructor(
        @InjectRepository(TrancheStudent)
        private trancheStudentRepository: EntityRepository<TrancheStudent>,
        @Inject(forwardRef(() => AvanceTrancheService))
        private avance: AvanceTrancheService,
        private trancheService: TrancheService,
        private studentService: StudentService,
        private twilioService: TwilioService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: TrancheStudentCreateInput,
      ): Promise<TrancheStudent> {  
        const trancheStudent = new TrancheStudent()

        const tranche = input.tranche
            ? await this.trancheService.findByOne({id:input.tranche.ID})
            : await this.trancheService.create(input.tranche)
        
        const student = input.student
            ? await this.studentService.findByOne({id:input.student.ID})
            : await this.studentService.create(input.student)


        trancheStudent.montant = input.montant
        trancheStudent.name = input.name
        trancheStudent.description = input.description
        trancheStudent.regimePaimemnt = input.regimePaimemnt
        trancheStudent.tranche.id = tranche.id
        trancheStudent.student.id = student.id

        let reduction = student.categorie.getEntity().reductionScolarite
        let amount = (await reduction.load())

        if(amount.pourcentage){
            var new_tranche_amount = tranche.montant - (amount.pourcentage*tranche.montant)
            if(trancheStudent.montant == new_tranche_amount && trancheStudent.regimePaimemnt === "NORMAL"){
                trancheStudent.complete = true
                await this.trancheStudentRepository.persistAndFlush(trancheStudent)
            }else{
                if(trancheStudent.montant !== new_tranche_amount && trancheStudent.regimePaimemnt === "SPECIAL" ){
                    // GENERATE AVANCE TRANCHE 
                    const avance = await this.avance.saveAvanceTranche(trancheStudent,new_tranche_amount)
                    if(avance.reste == 0){
                        trancheStudent.complete = true
                    }
                    await this.trancheStudentRepository.persistAndFlush(trancheStudent)
                }
                // create the avance tranche
                await this.avance.saveAvanceTranche(trancheStudent,new_tranche_amount)
                await this.trancheStudentRepository.persistAndFlush(trancheStudent)
                //create the alert with twiolio   
            }
        }

        var new_tranche_amount = tranche.montant - amount.montant
            if(trancheStudent.montant === new_tranche_amount && trancheStudent.regimePaimemnt === "NORMAL"){
                trancheStudent.complete = true
                await this.trancheStudentRepository.persistAndFlush(trancheStudent)
            }else{
                if(trancheStudent.montant !== new_tranche_amount && trancheStudent.regimePaimemnt === "SPECIAL" ){
                    // GENERATE AVANCE TRANCHE 
                    await this.avance.saveAvanceTranche(trancheStudent,new_tranche_amount)
                    await this.trancheStudentRepository.persistAndFlush(trancheStudent)
                }
                // create the avance tranche
                await this.avance.saveAvanceTranche(trancheStudent,new_tranche_amount)
                await this.trancheStudentRepository.persistAndFlush(trancheStudent)

                //create the alert
        }
        return trancheStudent
      }
    
    findByOne(filters: FilterQuery<TrancheStudent>): Promise<TrancheStudent | null> {
        return this.trancheStudentRepository.findOne(filters);
      }

    findById(id:string){
        return this.trancheStudentRepository.findOne(+id)
    }
    
    getAll(): Promise<TrancheStudent[]> {
        return this.trancheStudentRepository.findAll()
    }

    async createAlerteTranche(tranche:TrancheStudent){
        const avanceTranche = tranche.avancheTranche.matching({})
        const reste = avanceTranche[-1].reste
        if(tranche.complete == false){
            const dateLine = tranche.tranche.getEntity().dateLine
            const alertDate = dateLine.setDate(dateLine.getDate()-2)

            const toDay = new Date().getTime()

            const student = tranche.student.getEntity()
            const parent = student.user.getEntity()

            if(toDay === alertDate ){
                // create alert to parent 
                this.twilioService.client.messages.create({
                    body: "vous êtes prier de passer solder"+ tranche.name +"de votre enfant nome" + parent.name + "donc le reste est de"+reste,
                    from: "+237647476798" ,
                    to: parent.phoneNumber,
                  });
            }

        }
    }

    async saveTranche(id:number, avance:AvanceTranche){
        const tranche = await this.trancheStudentRepository.findOneOrFail(id)
        tranche.montant += avance.montant
        const student = tranche.student.getEntity()
        const categorie = student.categorie.getEntity()
        const retenu = categorie.reductionScolarite.getEntity()
        if(retenu.pourcentage != 0){
            const new_amount_tranche =tranche.tranche.getEntity().montant - retenu.pourcentage*tranche.tranche.getEntity().montant
            if(tranche.montant == new_amount_tranche){
                tranche.complete = true
            }
          }

        if(retenu.montant != 0 ){
            const new_amount_tranche =tranche.tranche.getEntity().montant - retenu.montant 
            if(tranche.montant == new_amount_tranche){
                tranche.complete = true
            } 
        }
        
        if(tranche.montant == tranche.tranche.getEntity().montant){
            tranche.complete = true
        }
        await this.trancheStudentRepository.persistAndFlush(tranche)
    }
      
    async update(trancheStudent: TrancheStudent, input: TrancheStudentUpdateInput): Promise<TrancheStudent> {
        if (input.tranche) {
            const tranche =
            input.tranche?.ID &&
              (await this.trancheService.findByOne({ id: input.tranche?.ID }));
      
            if (!tranche) {
              throw new NotFoundError('tranche no exist' || '');
            }
            this.trancheService.update(tranche, input.tranche);
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
 
        wrap(trancheStudent).assign({
            name:input.name || trancheStudent.name,
            montant: input.montant || trancheStudent.montant,
            description: input.description || trancheStudent.description,
        },
        { em: this.em },
        );
        await this.trancheStudentRepository.persistAndFlush(trancheStudent);
        return trancheStudent;
    }

    //  tous les etudiants etant à jour
    async AllStudentComplet(){
        const student = await this.trancheStudentRepository
    }

    // tous les etudiants n'etant pas à jour


    // montant attendu par section et cycle 


    // tous les avance d'une tranches

    async deletePrime(){}

}
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
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { Inscription } from 'src/entities/inscription.entity';
import { InscriptionService } from '../inscription/inscription.service';
import { AvanceInscriptionCreateInput } from './dto/avance-inscription.input';
import { AvanceInscriptionUpdateInput } from './dto/avance-inscription.update';


@Entity()
@ObjectType()
export class AvanceInscriptionService {
    constructor(
        @InjectRepository(AvanceInscription)
        private avanceInscriptionRepository: EntityRepository<AvanceInscription>,
        @Inject(forwardRef(() => InscriptionService))
        private inscription: InscriptionService,
        private  em: EntityManager,
      ) {}
    
    async create(
        input: AvanceInscriptionCreateInput,
      ): Promise<AvanceInscription> {  
        const avanceInscription = new AvanceInscription()

        const inscription = input.inscription
            ? await this.inscription.findByOne({id:input.inscription.ID})
            : await this.inscription.create(input.inscription)
        
        const inscriptionStudent = inscription.fraisInscription.getEntity()
        const amount = inscriptionStudent.montant

        avanceInscription.montant = input.montant
        avanceInscription.name = input.name
        avanceInscription.description = input.description
        avanceInscription.inscription.id = inscription.id
        avanceInscription.reste = inscription.montant - amount

        this.avanceInscriptionRepository.persistAndFlush(avanceInscription)
        
        this.inscription.saveInscription(inscription.id,avanceInscription)
        return avanceInscription
      }

    async saveAvanceTranche(inscription:Inscription,new_inscription_amount:number){
        const avance = new AvanceInscription()

        // check if student is complet
        const inscriptions = await this.inscription.findOrFailled(inscription.id)
        const avancesInscription = await inscription.avanceInscription.matching({orderBy:{paiementDate:'ASC'}})
        if (avancesInscription[0].complete == true){
            return 
        }
        avance.name = inscription.name
        avance.description = inscription.description
        avance.paiementDate = inscription.createdAt
        avance.montant = inscription.montant
        avance.inscription.id = inscription.id
        
        if(new_inscription_amount != 0){
            avance.reste = new_inscription_amount - inscription.montant
            if (avance.reste = 0){
                avance.complete = true
            }
        }
        avance.reste = inscription.fraisInscription.getEntity().montant - inscription.montant
        // avance.reste = inscription.tranche.getEntity().montant - tranche.montant
        await this.avanceInscriptionRepository.persistAndFlush(avance)
        return avance

    }
    
    findByOne(filters: FilterQuery<AvanceInscription>): Promise<AvanceInscription | null> {
        return this.avanceInscriptionRepository.findOne(filters);
      }
    findById(id:string){
        return this.avanceInscriptionRepository.findOne(+id)
      }
    
    getAll(): Promise<AvanceInscription[]> {
        return this.avanceInscriptionRepository.findAll()
      }
    
      
    async update(avance: AvanceInscription, input: AvanceInscriptionUpdateInput): Promise<AvanceInscription> {
        if (input.inscription) {
            const inscription =
            input.inscription?.ID &&
              (await this.inscription.findByOne({ id: input.inscription?.ID }));
      
            if (!inscription) {
              throw new NotFoundError('inscription no exist' || '');
            }
            this.inscription.update(inscription, input.inscription);
        }

 
        wrap(avance).assign({
            name:input.name || avance.name,
            montant: input.montant || avance.montant,
            description: input.description || avance.description,
        },
        { em: this.em },
        );
        await this.avanceInscriptionRepository.persistAndFlush(avance);
        return avance;
    }


    async delete(){}

}
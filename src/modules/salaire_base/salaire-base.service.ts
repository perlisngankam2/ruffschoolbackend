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
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { SalaireBaseCreateInput } from './dto/salaire-base.input';
import { SalaireBaseUpdateInput } from './dto/salaire-base.update';

@Entity()
@ObjectType()
export class SalaireBaseService {
    constructor(
        @InjectRepository(SalaireBase)
        private salaireBaseRepository: EntityRepository<SalaireBase>,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SalaireBaseCreateInput,
      ): Promise<SalaireBase> {        
        const salaireBase = new SalaireBase()

        salaireBase.montant = input.montant
        salaireBase.description = input.description || null
        

        await this.salaireBaseRepository.persistAndFlush(salaireBase)
        return salaireBase
      }
    
      findByOne(filters: FilterQuery<SalaireBase>): Promise<SalaireBase | null> {
        return this.salaireBaseRepository.findOne(filters);
      }
      findById(id:string){
        return this.salaireBaseRepository.findOne(+id)
      }
    
      getAll(): Promise<SalaireBase[]> {
        return this.salaireBaseRepository.findAll()
      }
      
      async update(salaireBase: SalaireBase, input: SalaireBaseUpdateInput): Promise<SalaireBase> {
        
        wrap(salaireBase).assign({
            montant: input.montant || salaireBase.montant,
            description: input.description || salaireBase.description
        },
        { em: this.em },
    );
        await this.salaireBaseRepository.persistAndFlush(salaireBase);
        return salaireBase;
      }
      async deletePrime(){
        
      }   
}
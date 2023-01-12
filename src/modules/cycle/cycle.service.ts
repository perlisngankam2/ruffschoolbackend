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
import { Cycle } from 'src/entities/cycle.entity';
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { Section } from 'src/entities/section.entity';
import { CycleCreateInput } from './dto/cycle.input';
import { CycleUpdateInput } from './dto/cycle.update';

@Entity()
@ObjectType()
export class CycleService {
    constructor(
        @InjectRepository(Cycle)
        private cycleRepository: EntityRepository<Cycle>,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: CycleCreateInput,
      ): Promise<Cycle> {        
        const cycle = new Cycle()
        cycle.name = input.name
        cycle.description = input.description || null
        await this.cycleRepository.persistAndFlush(cycle)
        return cycle
      }
    
      findByOne(filters: FilterQuery<Section>): Promise<Cycle | null> {
        return this.cycleRepository.findOne(filters);
      }
      findById(id:string){
        return this.cycleRepository.findOne(+id)
      }
    
      getAll(): Promise<Cycle[]> {
        return this.cycleRepository.findAll()
      }
      
      async update(cycle: Cycle, input: CycleUpdateInput): Promise<Cycle> {
        
        wrap(cycle).assign({
            name: input.name || cycle.name,
            description: input.description || cycle.description
        },
        { em: this.em },
    );
        await this.cycleRepository.persistAndFlush(cycle);
        return cycle;
      } 
}
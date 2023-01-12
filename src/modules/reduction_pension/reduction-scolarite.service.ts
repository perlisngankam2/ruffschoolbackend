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
import { ReductionScolarite } from 'src/entities/reduction-scolarite.entity';
import { RedutionScolariteInput } from './dto/reduction-scolarite.input';
import { UpdateReductionScolariteInput } from './dto/reduction-scolarite.update';


@Entity()
@ObjectType()
export class ReductionScolariteService {
    constructor(
        @InjectRepository(ReductionScolarite)
        private reductionRepository: EntityRepository<ReductionScolarite>,
        private readonly em: EntityManager,
      ) {}
    
      async create(
        input: RedutionScolariteInput,
      ): Promise<ReductionScolarite> {
       
        const reduction = new ReductionScolarite()

        reduction.name = input.name
        reduction.description = input.description
        reduction.montant = input.montant
        reduction.pourcentage = input.pourcentage
        await this.reductionRepository.persistAndFlush(reduction)
        return reduction
      }
    
      findByOne(filters: FilterQuery<ReductionScolarite>): Promise<ReductionScolarite | null> {
        return this.reductionRepository.findOne(filters);
      }
      findById(id:string){
        return this.reductionRepository.findOne(+id)
      }
    
      getAll(): Promise<ReductionScolarite[]> {
        return this.reductionRepository.findAll()
      }
      
      async update(reduction: ReductionScolarite, input: UpdateReductionScolariteInput): Promise<ReductionScolarite> {
        
        wrap(reduction).assign({
            name:input.name || reduction.name,
            description: input.description || reduction.description,
            montant:input.montant || reduction.montant,
            pourcentage:input.pourcentage || reduction.pourcentage
        },
        { em: this.em },
    );
        await this.reductionRepository.persistAndFlush(reduction);
        return reduction;
      }
      async deletePrime(){
      }
    
}
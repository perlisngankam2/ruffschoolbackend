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
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from './dto/section.input';
import { SectionUpdateInput } from './dto/section.update';

@Entity()
@ObjectType()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private sectionRepository: EntityRepository<Section>,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SectionCreateInput,
      ): Promise<Section> {        
        const section = new Section()

        section.name= input.name
        section.description = input.description || null
        

        await this.sectionRepository.persistAndFlush(section)
        return section
      }
    
      findByOne(filters: FilterQuery<Section>): Promise<Section | null> {
        return this.sectionRepository.findOne(filters);
      }
      findById(id:string){
        return this.sectionRepository.findOne(+id)
      }
    
      getAll(): Promise<Section[]> {
        return this.sectionRepository.findAll()
      }
      
      async update(section: Section, input: SectionUpdateInput): Promise<Section> {
        
        wrap(section).assign({
            name: input.name || section.name,
            description: input.description || section.description
        },
        { em: this.em },
    );
        await this.sectionRepository.persistAndFlush(section);
        return section;
      }
      async deletePrime(){
        
      }   
}
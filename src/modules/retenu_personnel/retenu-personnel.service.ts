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
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { PersonnelService } from '../personnel/personnel.service';
import { RetenuService } from '../retenu_salarial/retenu.service';
import { RetenuPersonnelCreateInput } from './dto/retenu-personnel.input';
import { RetenuPersonnelUpdateInput } from './dto/retenu-personnel.update';

@Entity()
@ObjectType()
export class RetenuPersonnelService {
    constructor(
        @InjectRepository(RetenuPersonnel)
        private retenuPersonnelRepository: EntityRepository<RetenuPersonnel>,
        private readonly em: EntityManager,
        private personnelService: PersonnelService,
        private retenuService: RetenuService
      ) {}
    
      async create(
        input: RetenuPersonnelCreateInput,
      ): Promise<RetenuPersonnel> {
        const retenu = input.retenu
            ? await this.retenuService.findByOne(input.retenu.ID)
            : await this.retenuService.create(input.retenu)
        
        const personnel = await this.personnelService.findByOne(input.personnnel)
        if(!personnel){
            throw new NotFoundError('personnel no exist' || '');
        }
        
        const retenuPersonnel = new RetenuPersonnel()

        retenuPersonnel.personnel.id = personnel.id
        retenuPersonnel.retenue.id = retenu.id
        

        await this.retenuPersonnelRepository.persistAndFlush(retenuPersonnel)
        return retenuPersonnel
      }
    
      findByOne(filters: FilterQuery<RetenuPersonnel>): Promise<RetenuPersonnel | null> {
        return this.retenuPersonnelRepository.findOne(filters);
      }

      findById(id:string){
        return this.retenuPersonnelRepository.findOne(+id)
      }
    
      getAll(): Promise<RetenuPersonnel[]> {
        return this.retenuPersonnelRepository.findAll()
      }
      
      async update(retenuPersonnel: RetenuPersonnel, input: RetenuPersonnelUpdateInput): Promise<RetenuPersonnel> {
        if (input.retenu) {
            const retenu =
            input.retenu?.ID &&
              (await this.retenuService.findByOne({ id: input.retenu?.ID }));
      
            if (!retenu) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.retenuService.update(retenu, input.retenu);
          }  
          
          
        if (input.personnnel) {
            const personnel =
            input.personnnel?.ID &&
              (await this.personnelService.findByOne({ id: input.personnnel?.ID }));
      
            if (!personnel) {
              throw new NotFoundError('personnel no exist' || '');
            }
            this.personnelService.update(personnel, input.personnnel);
          }  
        wrap(retenuPersonnel).assign({
            retenue: input.retenu || retenuPersonnel.retenue,
            personnel: input.personnnel || retenuPersonnel.personnel
        },
        { em: this.em },
    );
        await this.retenuPersonnelRepository.persistAndFlush(retenuPersonnel);
        return retenuPersonnel;
      }
    
      async deletePrime(){
    
      }
    
}
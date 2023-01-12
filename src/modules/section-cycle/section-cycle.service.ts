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
import { SectionCycle } from 'src/entities/section-cycle.entity';
import { CycleService } from '../cycle/cycle.service';
import { SectionService } from '../section/section.service';
import { SectionCycleCreateInput } from './dto/section-cycle.input';
import { SectionCycleUpdateInput } from './dto/section-cycle.update';

@Entity()
@ObjectType()
export class SectionCycleService {
    constructor(
        @InjectRepository(SectionCycle)
        private sectionCycleRepository: EntityRepository<SectionCycle>,
        private sectionService: SectionService,
        private cycle: CycleService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SectionCycleCreateInput,
      ): Promise<SectionCycle> {        
        const sectionCycle = new SectionCycle()
        const section = input.section
                ? await this.sectionService.findByOne({id:input.section?.ID})
                : await this.sectionService.create(input.section)
        
        const cycle = input.cycle
                ? await this.cycle.findByOne({id:input.cycle?.ID})
                : await this.cycle.create(input.cycle)

        sectionCycle.description = input.description || null
        sectionCycle.section.id = section.id
        sectionCycle.cycle.id = cycle.id

        await this.sectionCycleRepository.persistAndFlush(sectionCycle)
        return sectionCycle
      }
    
      findByOne(filters: FilterQuery<SectionCycle>): Promise<SectionCycle | null> {
        return this.sectionCycleRepository.findOne(filters);
      }
      findById(id:string){
        return this.sectionCycleRepository.findOne(+id)
      }
    
      getAll(): Promise<SectionCycle[]> {
        return this.sectionCycleRepository.findAll()
      }
      
      async update(sectionCycle: SectionCycle, input: SectionCycleUpdateInput): Promise<SectionCycle> {
        if(input.cycle){
            const cycle =
            input.cycle?.ID &&
              (await this.cycle.findByOne({id:input.cycle?.ID}));
      
            if (!cycle) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.cycle.update(cycle, input.cycle);   
        }

        if(input.section){
            const section =
            input.section?.ID &&
              (await this.sectionService.findByOne({id:input.section?.ID}));
      
            if (!section) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.cycle.update(section, input.section); 
        }
        wrap(sectionCycle).assign({
            description: input.description || sectionCycle.description
        },
        { em: this.em },
    );
        await this.sectionCycleRepository.persistAndFlush(sectionCycle);
        return sectionCycle;
      }
    async deletePrime(){
        
    }   

    async EtatInscriptionSection(id:number){
      const sectionCycle = await this.sectionCycleRepository.findOneOrFail(id)
      let montantAttendu = 0
      let montantRecu = 0
      const section  = sectionCycle.niveau
      for(let i =0; i < section.length; i++){
        for(let j = 0; j < section[i].salle.length; j++ ){
          montantAttendu += section[i].salle[j].effectif*section[i].salle[j].fraisInscription.getEntity().montant
          const listeInscription = section[i].salle[j].fraisInscription.getEntity().inscription
          for (let k = 0 ; k < listeInscription.length; k++){
              montantRecu += listeInscription[k].montant
          }
        }
      }

      return {
            "sectionCycle": sectionCycle,
            "montantAttendu" : montantAttendu,
            "montantRecu": montantRecu,
            "RAR": montantAttendu - montantRecu,
            "TRAR": ((montantAttendu - montantRecu)/montantAttendu)*100
      }

    } 
}
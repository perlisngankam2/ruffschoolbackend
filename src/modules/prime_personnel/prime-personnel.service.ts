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
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PersonnelService } from '../personnel/personnel.service';
import { PrimeService } from '../prime/prime.service';
import { PrimePersonnelCreateInput } from './dto/prime-personnel.input';
import { PrimePersonnelUpdateInput } from './dto/prime-personnel.update';

@Entity()
@ObjectType()
export class PrimePersonnelService {
    constructor(
        @InjectRepository(PrimePersonnel)
        private primePersonnelRepository: EntityRepository<PrimePersonnel>,
        private readonly em: EntityManager,
        private personnelService: PersonnelService,
        private primeService: PrimeService
      ) {}
    
      async create(
        input: PrimePersonnelCreateInput,
      ): Promise<PrimePersonnel> {
        const prime = input.prime
            ? await this.primeService.findByOne(input.prime)
            : await this.primeService.create(input.prime)
        
        const personnel = await this.personnelService.findByOne(input.personnnel)
        if(!personnel){
            throw new NotFoundError('personnel no exist' || '');
        }
        
        const primePersonnel = new PrimePersonnel()

        primePersonnel.personnel.id = personnel.id
        primePersonnel.prime.id = prime.id
        

        await this.primePersonnelRepository.persistAndFlush(primePersonnel)
        return primePersonnel
      }
    
      findByOne(filters: FilterQuery<PrimePersonnel>): Promise<PrimePersonnel | null> {
        return this.primePersonnelRepository.findOne(filters);
      }
      findById(id:string){
        return this.primePersonnelRepository.findOne(+id)
      }
    
      getAll(): Promise<PrimePersonnel[]> {
        return this.primePersonnelRepository.findAll()
      }
      
      async update(primePersonnel: PrimePersonnel, input: PrimePersonnelUpdateInput): Promise<PrimePersonnel> {
        if (input.prime) {
            const prime =
            input.prime?.ID &&
              (await this.primeService.findByOne({ id: input.prime?.ID }));
      
            if (!prime) {
              throw new NotFoundError('prime no exist' || '');
            }
            this.primeService.update(prime, input.prime);
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
        wrap(primePersonnel).assign({
            prime: input.prime || primePersonnel.prime,
            personnel: input.personnnel || primePersonnel.personnel
          },
          { em: this.em },
    );
        await this.primePersonnelRepository.persistAndFlush(primePersonnel);
        return primePersonnel;
      }
    
      async deletePrime(){
    
      }
    
}
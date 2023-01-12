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
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { PrimeCreateInput } from './dto/prime.input';
import { PrimeUpdateInput } from './dto/prime.update';


@Entity()
@ObjectType()
export class PrimeService {
    constructor(
        @InjectRepository(Prime)
        private primeRepository: EntityRepository<Prime>,
        private readonly em: EntityManager,
        private categoriePrime: CategoriePrimeService
      ) {}
    
      async create(
        input: PrimeCreateInput,
      ): Promise<Prime> {
        const categorie = input.categoriePirme
            ? await this.categoriePrime.findByOne(input.categoriePirme)
            : await this.categoriePrime.create(input.categoriePirme)
        const new_prime = new Prime()

        new_prime.categoriePrime.id = categorie.id
        new_prime.nom = input.nom
        new_prime.montant = input.montant
        new_prime.description = input.description
        
        await this.primeRepository.persistAndFlush(new_prime)
        return new_prime
      }
    
      findByOne(filters: FilterQuery<Prime>): Promise<Prime | null> {
        return this.primeRepository.findOne(filters);
      }
      findById(id:string){
        return this.primeRepository.findOne(+id)
      }
    
      getAll(): Promise<Prime[]> {
        return this.primeRepository.findAll()
      }
      
      async update(prime: Prime, input: PrimeUpdateInput): Promise<Prime> {
        if (input.categoriePirme) {
            const categorie =
            input.categoriePirme?.ID &&
              (await this.categoriePrime.findByOne({ id: input.categoriePirme?.ID }));
      
            if (!categorie) {
              throw new NotFoundError('categorie no exist' || '');
            }
            this.categoriePrime.update(categorie, input.categoriePirme);
          }   
        wrap(prime).assign({
            nom:input.nom || prime.nom,
            description: input.description || prime.description,
            montant:input.montant || prime.montant
        },
        { em: this.em },
    );
        await this.primeRepository.persistAndFlush(prime);
        return prime;
      }
    
      async deletePrime(){
    
      }
    
}
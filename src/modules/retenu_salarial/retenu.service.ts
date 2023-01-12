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
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePrimeService } from '../categorie_prime/categorie-prime.service';
import { CategorieRetenuService } from '../categorie_retenu/categorie-retenu.service';
import { RetenuCreateInput } from './dto/retenu.input';
import { RetenuUpdateInput } from './dto/retenu.update';


@Entity()
@ObjectType()
export class RetenuService {
    constructor(
        @InjectRepository(Retenue)
        private retenuRepository: EntityRepository<Retenue>,
        private readonly em: EntityManager,
        private categorieRetenu: CategorieRetenuService
      ) {}
    
      async create(
        input: RetenuCreateInput,
      ): Promise<Retenue> {
        const categorie = input.categorieRetenu
            ? await this.categorieRetenu.findByOne(input.categorieRetenu)
            : await this.categorieRetenu.create(input.categorieRetenu)
        
        const retenu = new Retenue()

        retenu.categorieRetenu.id = categorie.id
        retenu.nom = input.nom
        retenu.description = input.description
        retenu.montant = input.montant
        await this.retenuRepository.persistAndFlush(retenu)
        return retenu
      }
    
      findByOne(filters: FilterQuery<Retenue>): Promise<Retenue | null> {
        return this.retenuRepository.findOne(filters);
      }
      findById(id:string){
        return this.retenuRepository.findOne(+id)
      }
    
      getAll(): Promise<Retenue[]> {
        return this.retenuRepository.findAll()
      }
      
      async update(retenu: Retenue, input: RetenuUpdateInput): Promise<Retenue> {
        if (input.categorieRetenu) {
            const categorie =
            input.categorieRetenu?.ID &&
              (await this.categorieRetenu.findByOne({ id: input.categorieRetenu?.ID }));
      
            if (!categorie) {
              throw new NotFoundError('categorie no exist' || '');
            }
            this.categorieRetenu.update(categorie, input.categorieRetenu);
          }   
        wrap(retenu).assign({
            nom:input.nom || retenu.nom,
            description: input.description || retenu.description,
            montant:input.montant || retenu.montant
        },
        { em: this.em },
    );
        await this.retenuRepository.persistAndFlush(retenu);
        return retenu;
      }
    
      async deletePrime(){
    
      }
    
}
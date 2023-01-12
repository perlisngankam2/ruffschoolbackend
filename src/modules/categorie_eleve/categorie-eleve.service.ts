/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { ReductionScolariteService } from '../reduction_pension/reduction-scolarite.service';
import { CategorieEleveCreateInput } from './dto/categorie-eleve.input';
import { CategorieEleveUpdateInput } from './dto/categorie-eleve.update';

@Injectable()
export class CategorieEleveService {
  constructor(
    @InjectRepository(CategorieEleve)
    private categorieEleveRepository: EntityRepository<CategorieEleve>,
    private reductionService: ReductionScolariteService,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: CategorieEleveCreateInput,
  ): Promise<CategorieEleve> {
    const categorieEleve = new CategorieEleve()

    const reduction = input.reduction
            ?   await this.reductionService.findByOne({id:input.reduction?.ID})
            : await this.reductionService.create(input.reduction)

    categorieEleve.nom = input.nom
    categorieEleve.description = input.description
    categorieEleve.reductionScolarite.id = reduction.id
 
    await this.categorieEleveRepository.persistAndFlush(categorieEleve)
    return categorieEleve
  }

  findByOne(filters: FilterQuery<CategorieEleve>): Promise<CategorieEleve | null> {
    return this.categorieEleveRepository.findOne(filters);
  }

  findById(id:string){
    return this.categorieEleveRepository.findOne(+id)
  }

  getAll(): Promise<CategorieEleve[]> {
    return this.categorieEleveRepository.findAll()
  }
  
  async update(categorie: CategorieEleve, input: CategorieEleveUpdateInput): Promise<CategorieEleve> {
    if (input.reduction) {
        const reduction =
        input.reduction?.ID &&
          (await this.reductionService.findByOne({ id: input.reduction?.ID }));
  
        if (!reduction) {
          throw new NotFoundError('section no exist' || '');
        }
        this.reductionService.update(reduction, input.reduction);
      }

    wrap(categorie).assign({
      nom: input.nom || categorie.nom,
      description: input.description || categorie.description
    });
    await this.categorieEleveRepository.persistAndFlush(categorie);
    return categorie;
  }

  async deleteUser(){

  }

}
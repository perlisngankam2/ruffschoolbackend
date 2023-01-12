/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueCreateInput } from './dto/anne-accademique.update';
import { AnneeAccademiqueUpdateInput } from './dto/anne-accadmique.input';


@Injectable()
export class AnneeAccademiqueService {
  constructor(
    @InjectRepository(AnneeAccademique)
    private anneAccademiquePrimeRepository: EntityRepository<AnneeAccademique>,
    private readonly em: EntityManager,
  ) {}

  async create(
    input:AnneeAccademiqueCreateInput,
  ): Promise<AnneeAccademique> {
    const annee = new AnneeAccademique()
    annee.name = input.name
    annee.anneeAccademique = input.anneeAccademique
    annee.description = input.description
    
    await this.anneAccademiquePrimeRepository.persistAndFlush(annee)
    return annee
  }

  findByOne(filters: FilterQuery<AnneeAccademique>): Promise<AnneeAccademique | null> {
    return this.anneAccademiquePrimeRepository.findOne(filters);
  }

  findById(id:string){
    return this.anneAccademiquePrimeRepository.findOne(+id)
  }

  getAll(): Promise<AnneeAccademique[]> {
    return this.anneAccademiquePrimeRepository.findAll()
  }
  
  async update(annee: AnneeAccademique, input: AnneeAccademiqueUpdateInput): Promise<AnneeAccademique> {
    
    wrap(annee).assign({
      name: input.name || annee.name,
      description: input.description || annee.description,
      anneeAccademique: input.anneeAccademique || annee.anneeAccademique
    });

    await this.anneAccademiquePrimeRepository.persistAndFlush(annee);

    return annee;
  }

  async deleteUser(){

  }

}
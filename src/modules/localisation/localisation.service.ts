/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Localisation } from 'src/entities/localisation.entity';
import { LocalisationCreateInput } from './dto/localisation.input';
import { LocalisationUpdateInput } from './dto/localisation.update';


@Injectable()
export class LocalisationService {
  constructor(
    @InjectRepository(Localisation)
    private localisationRepository: EntityRepository<Localisation>,
    private readonly em: EntityManager,
  ) {}

  async create(
    input: LocalisationCreateInput,
  ): Promise<Localisation> {
    const adresse = new Localisation()
    adresse.ville = input.ville
    adresse.region = input.region
    adresse.quartier = input.quartier
    adresse.pays = input.pays
    adresse.latitude = input.latitude

    await this.localisationRepository.persistAndFlush(adresse)
    return adresse
  }

  findByOne(filters: FilterQuery<Localisation>): Promise<Localisation | null> {
    return this.localisationRepository.findOne(filters);
  }

  findById(id:string){
    return this.localisationRepository.findOne(+id)
  }

  getAll(): Promise<Localisation[]> {
    return this.localisationRepository.findAll()
  }
  
  async update(localisation: Localisation, input: LocalisationUpdateInput): Promise<Localisation> {

    wrap(localisation).assign({
      ville:input.ville || localisation.ville,
      region:input.region || localisation.region,
      bp:input.bp || localisation.bp,
      quartier:input.quartier || localisation.quartier,
      pays:input.pays || localisation.pays,
      latitude:input.latitude || localisation.latitude,
      longitude:input.longitude || localisation.longitude
    });

    await this.localisationRepository.persistAndFlush(localisation);

    return localisation;
  }

  async deleteUser(){
    
  }

}
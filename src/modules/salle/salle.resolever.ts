import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Salle } from 'src/entities/salle.entity';
import { SalleCreateInput } from './dto/salle.input';
import { SalleService } from './salle.service';


@Resolver(() => Salle)
export class SalleResolver {
  constructor(private readonly salleService: SalleService) {}

  @Mutation(() => Salle)
  createSalle(@Args('salle') salaireCreateInput: SalleCreateInput) {
    return this.salleService.create(salaireCreateInput);
  }

  @Query(() => [Salle])
  findAll() {
    return this.salleService.getAll()
  }
  
  @Query(() => Salle, { name: 'salle' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.salleService.findByOne(+id);
  }

  @Query(() => Salle, { name: 'etatInscriptionSalle' })
  inscriptionSalle(@Args('id', { type: () => String }) id: string) {
    return this.salleService.inscriptionRecuSalle(+id);
  }

}

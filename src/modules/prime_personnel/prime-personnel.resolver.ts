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
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { Prime } from 'src/entities/prime.entity';
import { PrimePersonnelCreateInput } from './dto/prime-personnel.input';
import { PrimePersonnelService } from './prime-personnel.service';


@Resolver(() => PrimePersonnel)
export class PrimePersonnelResolver {
  constructor(private readonly primePersonnelService: PrimePersonnelService) {}

  @Mutation(() => PrimePersonnel)
  create(@Args('primePersonnel') createPrimePersonnelInput: PrimePersonnelCreateInput) {
    return this.primePersonnelService.create(createPrimePersonnelInput);
  }

  @Query(() => [PrimePersonnel])
  findAll() {
    return this.primePersonnelService.getAll()
  }
  
  @Query(() => PrimePersonnel, { name: 'primePersonnel' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.primePersonnelService.findByOne(+id);
  }

}

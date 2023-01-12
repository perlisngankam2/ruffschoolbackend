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
import { Prime } from 'src/entities/prime.entity';
import { PrimeCreateInput } from './dto/prime.input';
import { PrimeService } from './prime.service';


@Resolver(() => Prime)
export class PrimeResolver {
  constructor(private readonly primeService: PrimeService) {}

  @Mutation(() => Prime)
  create(@Args('prime') createPrimeInput: PrimeCreateInput) {
    return this.primeService.create(createPrimeInput);
  }

  @Query(() => [Prime])
  findAll() {
    return this.primeService.getAll()
  }
  
  @Query(() => Prime, { name: 'prime' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.primeService.findByOne(+id);
  }

}

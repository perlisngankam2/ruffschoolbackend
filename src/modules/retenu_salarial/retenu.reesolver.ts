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
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { RetenuCreateInput } from './dto/retenu.input';
import { RetenuService } from './retenu.service';


@Resolver(() => Retenue)
export class RetenuResolver {
  constructor(private readonly retenuService: RetenuService) {}

  @Mutation(() => Retenue)
  create(@Args('retenue') createRetenuInput: RetenuCreateInput) {
    return this.retenuService.create(createRetenuInput);
  }

  @Query(() => [Retenue])
  findAll() {
    return this.retenuService.getAll()
  }
  
  @Query(() => Prime, { name: 'prime' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.retenuService.findByOne(+id);
  }

}

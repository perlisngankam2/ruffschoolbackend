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
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { SalaireBaseCreateInput } from './dto/salaire-base.input';
import { SalaireBaseService } from './salaire-base.service';


@Resolver(() => SalaireBase)
export class SalaireBaseResolver {
  constructor(private readonly salaireBaseService: SalaireBaseService) {}

  @Mutation(() => SalaireBase)
  create(@Args('salaireBase') salaireCreateInput: SalaireBaseCreateInput) {
    return this.salaireBaseService.create(salaireCreateInput);
  }

  @Query(() => [SalaireBase])
  findAll() {
    return this.salaireBaseService.getAll()
  }
  
  @Query(() => SalaireBase, { name: 'salaireBase' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.salaireBaseService.findByOne(+id);
  }

}

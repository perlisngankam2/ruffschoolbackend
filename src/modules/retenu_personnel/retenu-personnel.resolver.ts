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
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { RetenuPersonnelCreateInput } from './dto/retenu-personnel.input';
import { RetenuPersonnelService } from './retenu-personnel.service';


@Resolver(() => RetenuPersonnel)
export class RetenuPersonnelResolver {
  constructor(private readonly retenuPersonnelService: RetenuPersonnelService) {}

  @Mutation(() => RetenuPersonnel)
  create(@Args('retenuPersonnel') createRetenuPersonnelInput: RetenuPersonnelCreateInput) {
    return this.retenuPersonnelService.create(createRetenuPersonnelInput);
  }

  @Query(() => [RetenuPersonnel])
  findAll() {
    return this.retenuPersonnelService.getAll()
  }
  
  @Query(() => RetenuPersonnel, { name: 'retenuPersonnel' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.retenuPersonnelService.findByOne(+id);
  }

}

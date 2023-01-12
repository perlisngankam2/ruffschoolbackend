import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { ParentCreateInput } from './dto/parent.input';
import { Parent } from 'src/entities/parent.entity';
import { ParentService } from './parent.service';
import { ParentUpdateInput } from './dto/parent.update';

@Resolver(() => Parent)
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(() => Parent)
  createParent(@Args('parent') Input: ParentCreateInput) {
    return this.parentService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [Parent])
  findAll() {
    return this.parentService.getAll()
  }
  
  @Query(() => Parent, { name: 'parent' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.parentService.findByOne(+id);
  }
}

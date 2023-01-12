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
import { Tranche } from 'src/entities/tranche.entity';
import { TrancheCreateInput } from './dto/tranche.input';
import { TrancheService } from './tranche.service';


@Resolver(() => Tranche)
export class TrancheResolver {
  constructor(private readonly trancheService: TrancheService) {}

  @Mutation(() => Tranche)
  createTranche(@Args('tranche') Input: TrancheCreateInput) {
    return this.trancheService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [Tranche])
  findAll() {
    return this.trancheService.getAll()
  }
  
  @Query(() => Tranche, { name: 'tranche' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(+id);
  }
}

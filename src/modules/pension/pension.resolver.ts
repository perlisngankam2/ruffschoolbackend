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
import { Pension } from 'src/entities/pension.entity';
import { PensionCreateInput } from './dto/pension.input';
import { PensionService } from './pension.service';


@Resolver(() => Pension)
export class PensionResolver {
  constructor(private readonly pensionService: PensionService) {}

  @Mutation(() => Pension)
  createPension(@Args('pension') Input: PensionCreateInput) {
    return this.pensionService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [Pension])
  findAll() {
    return this.pensionService.getAll()
  }
  
  @Query(() => Pension, { name: 'pension' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pensionService.findByOne(+id);
  }
}

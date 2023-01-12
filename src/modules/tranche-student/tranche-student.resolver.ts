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
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { TrancheStudentCreateInput } from './dto/tranche-student.input';
import { TrancheStudentService } from './tranche-student.service';


@Resolver(() => TrancheStudent)
export class TrancheStudentResolver {
  constructor(private readonly trancheService: TrancheStudentService) {}

  @Mutation(() => TrancheStudent)
  createTrancheStudent(@Args('trancheStudent') Input: TrancheStudentCreateInput) {
    return this.trancheService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateTrancheStudent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [TrancheStudent])
  findAll() {
    return this.trancheService.getAll()
  }
  
  @Query(() => TrancheStudent, { name: 'trancheStudent' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.trancheService.findByOne(+id);
  }
}

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
import { Cycle } from 'src/entities/cycle.entity';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from '../section/dto/section.input';
import { CycleService } from './cycle.service';
import { CycleCreateInput } from './dto/cycle.input';


@Resolver(() => Cycle)
export class CycleResolver {
  constructor(private readonly cycleService: CycleService) {}

  @Mutation(() => Cycle)
  createCycle(@Args('cycle') input:CycleCreateInput) {
    return this.cycleService.create(input);
  }
  @Query(() => [Cycle])
  findAll() {
    return this.cycleService.getAll()
  }
  
  @Query(() => Cycle, { name: 'cycle' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.cycleService.findByOne(+id);
  }
}

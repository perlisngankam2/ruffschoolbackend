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
import { SectionCycle } from 'src/entities/section-cycle.entity';
import { SectionCycleCreateInput } from './dto/section-cycle.input';
import { SectionCycleService } from './section-cycle.service';

@Resolver(() => SectionCycle)
export class SectionCycleResolver {
  constructor(private readonly sectionCycleService: SectionCycleService) {}

  @Mutation(() => SectionCycle)
  createSectionCycle(@Args('sectionCyvle') input: SectionCycleCreateInput) {
    return this.sectionCycleService.create(input);
  }

  @Query(() => [SectionCycle])
  findAll() {
    return this.sectionCycleService.getAll()
  }

  @Query(() => SectionCycle, { name: 'sectionCycle' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sectionCycleService.findByOne(+id);
  }

  @Query(() => SectionCycle, { name: 'etatInscription' })
  etatInscriptionSection(@Args('id', { type: () => String }) id: string) {
    return this.sectionCycleService.EtatInscriptionSection(+id);
  }
}

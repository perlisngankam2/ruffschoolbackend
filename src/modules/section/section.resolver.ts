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
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Section } from 'src/entities/section.entity';
import { SectionCreateInput } from './dto/section.input';
import { SectionService } from './section.service';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Mutation(() => Section)
  createSection(@Args('section') input: SectionCreateInput) {
    return this.sectionService.create(input);
  }

  @Query(() => [Section])
  findAll() {
    return this.sectionService.getAll()
  }

  @Query(() => Section, { name: 'section' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sectionService.findByOne(+id);
  }
}

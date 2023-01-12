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
import { PeriodeCreateInput } from './dto/periode.input';
import { PeriodeService } from './periode.service';


@Resolver(() => Periode)
export class PeriodeResolver {
  constructor(private readonly periodeService: PeriodeService) {}

  @Mutation(() => Periode)
  create(@Args('periode') createPeriodeInput: PeriodeCreateInput) {
    return this.periodeService.create(createPeriodeInput);
  }
  @Query(() => [Periode])
  findAll() {
    return this.periodeService.getAll()
  }
  @Query(() => Periode, { name: 'periode' })
  findOnePrime(@Args('id', { type: () => String }) id: string) {
    return this.periodeService.findByOne(+id);
  }
}

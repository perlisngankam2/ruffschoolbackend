/* eslint-disable prettier/prettier */
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
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueService } from './anne-accademique.service';
import { AnneeAccademiqueCreateInput } from './dto/anne-accademique.update';



@Resolver(() => AnneeAccademique)
export class AnneeAccademiqueResolver {
  constructor(private readonly anneeService: AnneeAccademiqueService) {}

  @Mutation(() => AnneeAccademique)
  createAnnerAccademique(@Args('anneeAccademique') input: AnneeAccademiqueCreateInput) {
    return this.anneeService.create(input);
  }
  @Query(() => [AnneeAccademique])
  findAllAnnerAccademique() {
    return this.anneeService.getAll()
  }
  
  @Query(() => AnneeAccademique, { name: 'anneeAccademique' })
  findOneAnnerAccademique(@Args('id', { type: () => String }) id: string) {
    return this.anneeService.findByOne(+id);
  }
}

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
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { CategoriePrime } from 'src/entities/categorie-prime.entity';
import { CategorieRetenu } from 'src/entities/categorie-retenu.entity';
import { CategorieRetenuService } from './categorie-retenu.service';
import { CategorieRetenuCreateInput } from './dto/categorie-retenu.input';


@Resolver(() => CategorieRetenu)
export class CategorieRetenuResolver {
  constructor(private readonly categorieRetenuService: CategorieRetenuService) {}

  @Mutation(() => CategorieRetenu)
  create(@Args('createCategorieRetenu') createCatgorieRetenuInput: CategorieRetenuCreateInput) {
    return this.categorieRetenuService.create(createCatgorieRetenuInput);
  }
  
  @Query(() => [CategorieRetenu])
  findAll() {
    return this.categorieRetenuService.getAll()
  }
  
  @Query(() => CategoriePrime, { name: 'categorieRetenu' })
  findOneCategorieRetenu(@Args('id', { type: () => String }) id: string) {
    return this.categorieRetenuService.findByOne(+id);
  }

}

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
import { CategoriePersonnelService } from './categorie-personnel.service';
import { CategoriePersonnelCreateInput } from './dto/categorie-personnel.input';


@Resolver(() => CategoriePersonnel)
export class CategoriePersonnelResolver {
  constructor(private readonly categorieService: CategoriePersonnelService) {}

  @Mutation(() => CategoriePersonnel)
  create(@Args('createCategoriePersonnel') createCatgoriePersonnelInput: CategoriePersonnelCreateInput) {
    return this.categorieService.create(createCatgoriePersonnelInput);
  }
  
  @Query(() => [CategoriePersonnel])
  findAll() {
    return this.categorieService.getAll()
  }
  
  @Query(() => CategoriePersonnel, { name: 'categoriePersonnel' })
  findOneCategorie(@Args('id', { type: () => String }) id: string) {
    return this.categorieService.findByOne(+id);
  }

}

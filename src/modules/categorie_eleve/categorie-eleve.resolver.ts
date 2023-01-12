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
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { CategorieEleveService } from './categorie-eleve.service';
import { CategorieEleveCreateInput } from './dto/categorie-eleve.input';


@Resolver(() => CategorieEleve)
export class CategorieEleveResolver {
  constructor(private readonly categorieService: CategorieEleveService) {}

  @Mutation(() => CategorieEleve)
  create(@Args('createCategorieEleve') createCatgorieEleveInput: CategorieEleveCreateInput) {
    return this.categorieService.create(createCatgorieEleveInput);
  }
  
  @Query(() => [CategorieEleve])
  findAll() {
    return this.categorieService.getAll()
  }
  
  @Query(() => CategorieEleve, { name: 'categorieEleve' })
  findOneCategorie(@Args('id', { type: () => String }) id: string) {
    return this.categorieService.findByOne(+id);
  }
}

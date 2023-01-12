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
import { CategoriePrimeService } from './categorie-prime.service';
import { CategoriePrimeCreateInput } from './dto/categorie-prime.input';


@Resolver(() => CategoriePrime)
export class CategoriePrimeResolver {
  constructor(private readonly categoriePrimeService: CategoriePrimeService) {}

  @Mutation(() => CategoriePrime)
  create(@Args('createCategoriePrime') createCatgoriePrimeInput: CategoriePrimeCreateInput) {
    return this.categoriePrimeService.create(createCatgoriePrimeInput);
  }
  
  @Query(() => [CategoriePrime])
  findAll() {
    return this.categoriePrimeService.getAll()
  }
  
  @Query(() => CategoriePrime, { name: 'categoriePrime' })
  findOneCategoriePrime(@Args('id', { type: () => String }) id: string) {
    return this.categoriePrimeService.findByOne(+id);
  }

}

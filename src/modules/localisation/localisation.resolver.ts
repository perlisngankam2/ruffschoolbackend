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
import { Localisation } from 'src/entities/localisation.entity';
import { LocalisationCreateInput } from './dto/localisation.input';
import { LocalisationService } from './localisation.service';


@Resolver(() => Localisation)
export class LocalisationResolver {
  constructor(private readonly localisationService: LocalisationService) {}

  @Mutation(() => Localisation)
  createLocalisation(@Args('createLocalisation') input: LocalisationCreateInput) {
    return this.localisationService.create(input);
  }
  
  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.getAll();
  // }

  @Query(() => [Localisation])
  findAll() {
    return this.localisationService.getAll()
  }
  
  @Query(() => Localisation, { name: 'localisation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.localisationService.findByOne(+id);
  }

}

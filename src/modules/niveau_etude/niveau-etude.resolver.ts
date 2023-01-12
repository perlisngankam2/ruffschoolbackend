import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { NiveauEtudeCreateInput } from './dto/niveau-etude.input';
import { NiveauEtudeService } from './niveau-etude.service';


@Resolver(() => NiveauEtude)
export class NiveauEtudeResolver {
  constructor(private readonly niveauEtudeService: NiveauEtudeService) {}

  @Mutation(() => NiveauEtude)
  createNiveau(@Args('niveauEtude') Input: NiveauEtudeCreateInput) {
    return this.niveauEtudeService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [NiveauEtude])
  findAll() {
    return this.niveauEtudeService.getAll()
  }
  
  @Query(() => NiveauEtude, { name: 'niveaEtude' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.niveauEtudeService.findByOne(+id);
  }

  @Query(() => NiveauEtude, { name: 'etatInscriptionNiveau' })
  eteInscriptionNiveau(@Args('id', { type: () => String }) id: string) {
    return this.niveauEtudeService.etatInscriptionNiveau(+id);
  }
}

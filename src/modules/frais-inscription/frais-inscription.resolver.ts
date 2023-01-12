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
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { FraisInscriptionInput } from './dto/frais-inscription.input';
import { FraisInscriptionService } from './frais-inscription.service';


@Resolver(() => FraisInscription)
export class FraisInscriptionResolver {
  constructor(private readonly fraisService: FraisInscriptionService) {}

  @Mutation(() => FraisInscription)
  createFraisInscription(@Args('fraisInscription') Input: FraisInscriptionInput) {
    return this.fraisService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [FraisInscription])
  findAll() {
    return this.fraisService.getAll()
  }
  
  @Query(() => FraisInscription, { name: 'fraisInscription' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.fraisService.findByOne(+id);
  }
}

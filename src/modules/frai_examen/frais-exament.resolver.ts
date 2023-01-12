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
import { FraisExamen } from 'src/entities/frais-exament.entity';
import { FraisExamentInput } from './dto/frais-exament.input';
import { FraisExamenService } from './frais-examen.service';


@Resolver(() => FraisExamen)
export class FraisExamenResolver {
  constructor(private readonly fraisService: FraisExamenService) {}

  @Mutation(() => FraisExamen)
  createFraisExamen(@Args('fraisExamen') Input: FraisExamentInput) {
    return this.fraisService.create(Input);
  }

//   @Mutation(() => Parent)
//   updateParent(@Args('id', { type: () => String }) id: string, Input: ParentUpdateInput) {
//     return this.parentService.update(id,Input);
//   }

  @Query(() => [FraisExamen])
  findAll() {
    return this.fraisService.getAll()
  }
  
  @Query(() => FraisExamen, { name: 'fraisExamen' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.fraisService.findByOne(id);
  }
}

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
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { AvanceInscriptionService } from './avance-inscription.service';
import { AvanceInscriptionCreateInput } from './dto/avance-inscription.input';
import { AvanceInscriptionUpdateInput } from './dto/avance-inscription.update';


@Resolver(() => AvanceInscription)
export class AvanceInscriptionResolver {
  constructor(private readonly avanceinscriptionService: AvanceInscriptionService) {}

  @Mutation(() => AvanceInscription)
  createAvanceInscription(@Args('avanceInscription') Input: AvanceInscriptionCreateInput) {
    return this.avanceinscriptionService.create(Input);
  }

  @Mutation(() => AvanceInscription)
  update(@Args('inscription') Input: AvanceInscriptionUpdateInput, viewer: AvanceInscription,) {
    return this.avanceinscriptionService.update(viewer,Input);
  }

  @Query(() => [AvanceInscription])
  findAll() {
    return this.avanceinscriptionService.getAll()
  }
  
  @Query(() => AvanceInscription, { name: 'avanceInscription' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.avanceinscriptionService.findByOne(+id);
  }

}


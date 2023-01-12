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
import { Personnel } from 'src/entities/pesonnel.entity';
import { User } from 'src/entities/user.entity';
import { PersonnelCreateInput } from './dto/personnel.input';
import { PersonnelService } from './personnel.service';


@Resolver(() => Personnel)
export class PersonnelResolver {
  constructor(private readonly personnelService: PersonnelService) {}

  @Mutation(() => Personnel)
  create(@Args('createPersonnelUser') createPersonnelUserInput: PersonnelCreateInput) {
    return this.personnelService.createPersonnel(createPersonnelUserInput);
  }

  @Query(() => [Personnel])
  findAll() {
    return this.personnelService.getAll()
  }
  
  @Query(() => Personnel, { name: 'personnel' })
  findOnePersonnel(@Args('id', { type: () => String }) id: string) {
    return this.personnelService.findByOne(+id);
  }

}

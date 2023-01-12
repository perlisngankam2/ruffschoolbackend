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
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from './dto/user.input';
import { UserService } from './user.service';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  create(@Args('createUser') createUserInput: UserCreateInput) {
    return this.userService.create(createUserInput);
  }
  
  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.getAll();
  // }

  @Query(() => [User])
  findAll() {
    return this.userService.getAll()
  }
  
  @Query(() => User, { name: 'user' })
  findOneUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findByOne(id);
  }

}

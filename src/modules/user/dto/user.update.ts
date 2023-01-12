import { Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { UserCreateInput } from './user.input';

export class UpdateUserInput {
  
    @Field({nullable:true})
  ID!: string;

  @Field({nullable:true})
  email!: string;

  @Field({nullable:true})
  password!: string;

  @Field({nullable:true})
  firstName!: string;

  @Field({nullable:true})
  lastName!: string;

  @Field({nullable:true})
  name!: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;
}

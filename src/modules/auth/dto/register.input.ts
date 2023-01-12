/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import passport = require('passport');


@InputType()
export class SingInInput {
    @Field()
    phone: string;

    @Field()
    username:string;

    @Field()
    name:string;

    @Field()
    password: string;
}
/* eslint-disable prettier/prettier */
import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import passport = require('passport');


@InputType()
export class CreateOtpInput {
    @Field()
    phone: string;
}
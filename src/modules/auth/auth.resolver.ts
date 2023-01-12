/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.inputs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { SingInInput } from './dto/register.input';
import { User } from 'src/entities/user.entity';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    loginauth(@Args('loginuserinput') loginuserinput: LoginUserInput ,@Context() context) {
        return this.authService.login(context.user);
    }

}


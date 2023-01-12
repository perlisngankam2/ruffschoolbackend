/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
//import { Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { extend } from '@nestjs/graphql';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrkey:jwtConstants.secret,
            logging: true
        });
    }
    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email
        }
    }
}
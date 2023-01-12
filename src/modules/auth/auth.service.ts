/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcript from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { SingInInput } from './dto/register.input';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByOne(email);
        const valid = await bcript.compare(password, user.password);

        if (user && valid) { // do more secure
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
    async login(user:User ) {
        return {
            access_token: this.jwtService.sign({
                email: user.email, 
                sub: user.id}), // todo: implement jwt
            user,
        }
    }

    // async signup(register: SingInInput) {
    //     const user = await this.userService.findByOne(register.phone)
    //     if(user) {
    //         throw new Error("user already exist");
    //     }
    //     const password = await bcript.hash(register.password,10)

    //     return this.userService.create ({
    //         ...register,
    //         password,
    //     })
    // }
}

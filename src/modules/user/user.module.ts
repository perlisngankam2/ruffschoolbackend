import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [User] })
    ],
    providers:[UserService,UserResolver],
    exports:[UserService]

})
export class UserModule {}

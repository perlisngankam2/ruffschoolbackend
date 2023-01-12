import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Parent } from 'src/entities/parent.entity';
import { UserModule } from '../user/user.module';
import { ParentResolver } from './parent.resolver';
import { ParentService } from './parent.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Parent] }),
        UserModule
    ],
    providers:[ParentService,ParentResolver],
    exports:[]
})
export class ParentModule {}

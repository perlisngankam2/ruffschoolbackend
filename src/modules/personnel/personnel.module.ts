import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Personnel } from 'src/entities/pesonnel.entity';
import { UserModule } from '../user/user.module';
import { PersonnelResolver } from './personnel.resolver';
import { PersonnelService } from './personnel.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Personnel] }),
        UserModule
    ],
    providers:[PersonnelResolver,PersonnelService],
    exports:[PersonnelService]
})
export class PersonnelModule {}

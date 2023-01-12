import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RetenuPersonnel } from 'src/entities/retenu-personnel.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { RetenuSalarialModule } from '../retenu_salarial/retenu_salarial.module';
import { RetenuPersonnelResolver } from './retenu-personnel.resolver';
import { RetenuPersonnelService } from './retenu-personnel.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [RetenuPersonnel] }),
        RetenuSalarialModule,
        PersonnelModule
    ],
    providers:[RetenuPersonnelService,RetenuPersonnelResolver],
    exports:[RetenuPersonnelService]
})
export class RetenuPersonnelModule {}

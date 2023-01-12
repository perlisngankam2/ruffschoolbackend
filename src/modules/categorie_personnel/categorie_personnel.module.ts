import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriePersonnel } from 'src/entities/categorie-personnel.entity';
import { PrimeModule } from '../prime/prime.module';
import { RetenuSalarialModule } from '../retenu_salarial/retenu_salarial.module';
import { SalaireBaseModule } from '../salaire_base/salaire_base.module';
import { CategoriePersonnelResolver } from './categorie-personnel.resolver';
import { CategoriePersonnelService } from './categorie-personnel.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategoriePersonnel] }),
        PrimeModule,
        RetenuSalarialModule,
        SalaireBaseModule
    ],
    providers:[CategoriePersonnelService,CategoriePersonnelResolver],
    exports:[CategoriePersonnelService]
})
export class CategoriePersonnelModule {}

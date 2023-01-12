import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Salle } from '../../entities/salle.entity';

import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleResolver } from './salle.resolever';
import { SalleService } from './salle.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities:[Salle]}),
        NiveauEtudeModule
    ],
    providers:[SalleService,SalleResolver],
    exports:[SalleService]
})
export class SalleModule {}

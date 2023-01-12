import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { Pension } from 'src/entities/pension.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleModule } from '../salle/salle.module';
import { PensionResolver } from './pension.resolver';
import { PensionService } from './pension.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Pension] }),
        AnneAccademiqueModule,
        SalleModule
    ],
    providers:[PensionService,PensionResolver],
    exports:[PensionService]
})
export class PensionModule {}

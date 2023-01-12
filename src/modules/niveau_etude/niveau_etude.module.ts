import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { SectionCycleModule } from '../section-cycle/section-cycle.module';
import { NiveauEtudeResolver } from './niveau-etude.resolver';
import { NiveauEtudeService } from './niveau-etude.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [NiveauEtude] }),
        SectionCycleModule
    ],
    providers:[NiveauEtudeService,NiveauEtudeResolver],
    exports:[NiveauEtudeService]
})
export class NiveauEtudeModule {}

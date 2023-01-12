import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FraisExamen } from 'src/entities/frais-exament.entity';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleModule } from '../salle/salle.module';
import { FraisExamenService } from './frais-examen.service';
import { FraisExamenResolver } from './frais-exament.resolver';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [FraisExamen] }),
        SalleModule,
        AnneAccademiqueModule
    ],
    providers:[FraisExamenResolver,FraisExamenService],
    exports:[FraisExamenService]
})
export class FraiExamenModule {}

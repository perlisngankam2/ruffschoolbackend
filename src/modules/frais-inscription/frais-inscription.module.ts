import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FraisInscription } from 'src/entities/frais-inscription.entity';
import { NiveauEtude } from 'src/entities/niveau-etude.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { NiveauEtudeModule } from '../niveau_etude/niveau_etude.module';
import { SalleModule } from '../salle/salle.module';
import { FraisInscriptionResolver } from './frais-inscription.resolver';
import { FraisInscriptionService } from './frais-inscription.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [FraisInscription] }),
        SalleModule,
        AnneAccademiqueModule
    ],
    providers:[FraisInscriptionService,FraisInscriptionResolver],
    exports:[FraisInscriptionService]
})
export class FraisInscriptionModule {}

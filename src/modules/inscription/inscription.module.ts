import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { Inscription } from 'src/entities/inscription.entity';
import { AnneAccademiqueModule } from '../anne_accademique/anne_accademique.module';
import { AvanceInscriptionModule } from '../avance-inscription/avance-inscription.module';
import { FraisInscriptionModule } from '../frais-inscription/frais-inscription.module';
import { StudentModule } from '../student/student.module';
import { InscriptionResolver } from './inscription.resolver';
import { InscriptionService } from './inscription.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Inscription] }),
        forwardRef(() => AvanceInscriptionModule),
        StudentModule,  
        AnneAccademiqueModule,
        FraisInscriptionModule,
    ],
    providers:[InscriptionService,InscriptionResolver],
    exports:[InscriptionService]
})
export class InscriptionModule {}

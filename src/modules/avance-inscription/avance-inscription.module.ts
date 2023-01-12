import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { AvanceInscription } from 'src/entities/avance-inscription.entity';
import { Inscription } from 'src/entities/inscription.entity';
import { InscriptionModule } from '../inscription/inscription.module';
import { AvanceInscriptionResolver } from './avance-incription.resolver';
import { AvanceInscriptionService } from './avance-inscription.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [AvanceInscription] }),
        forwardRef(() => InscriptionModule),  
    ],
    providers:[AvanceInscriptionService,AvanceInscriptionResolver],
    exports:[AvanceInscriptionService]
})
export class AvanceInscriptionModule {}

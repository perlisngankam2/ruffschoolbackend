import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Localisation } from 'src/entities/localisation.entity';
import { LocalisationResolver } from './localisation.resolver';
import { LocalisationService } from './localisation.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Localisation] }),
    ],
    providers:[LocalisationService,LocalisationResolver],
    exports:[LocalisationService]
})
export class LocalisationModule {}

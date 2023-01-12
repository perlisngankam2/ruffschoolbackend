import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Prime } from 'src/entities/prime.entity';
import { CategoriePrimeModule } from '../categorie_prime/categorie_prime.module';
import { PrimeResolver } from './prime.resoler';
import { PrimeService } from './prime.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Prime] }),
        CategoriePrimeModule
    ],
    providers:[PrimeService,PrimeResolver],
    exports:[PrimeService]
})
export class PrimeModule {}

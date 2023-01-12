import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriePrime } from 'src/entities/categorie-prime.entity';
import { CategoriePrimeService } from './categorie-prime.service';
import { CategoriePrimeResolver } from './categorie-resolver';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategoriePrime] })
    ],
    providers:[CategoriePrimeService,CategoriePrimeResolver],
    exports:[CategoriePrimeService]
})
export class CategoriePrimeModule {}

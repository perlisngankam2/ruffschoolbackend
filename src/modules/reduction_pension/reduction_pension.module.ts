import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ReductionScolarite } from 'src/entities/reduction-scolarite.entity';
import { CategoriePrimeModule } from '../categorie_prime/categorie_prime.module';
import { ReductionScolariteService } from './reduction-scolarite.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [ReductionScolarite] }),
    ],
    providers:[ReductionScolariteService,ReductionScolarite],
    exports:[ReductionScolariteService]
})
export class ReductionPensionModule {}

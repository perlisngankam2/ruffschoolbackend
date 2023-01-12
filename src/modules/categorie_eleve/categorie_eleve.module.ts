import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { ReductionPensionModule } from '../reduction_pension/reduction_pension.module';
import { CategorieEleveResolver } from './categorie-eleve.resolver';
import { CategorieEleveService } from './categorie-eleve.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategorieEleve] }),
        ReductionPensionModule
    ],
    providers:[CategorieEleveService,CategorieEleveResolver],
    exports:[CategorieEleveService]
})
export class CategorieEleveModule {}

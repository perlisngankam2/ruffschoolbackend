import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategorieRetenu } from 'src/entities/categorie-retenu.entity';
import { CategorieRetenuResolver } from './categorie-retenu.resolver';
import { CategorieRetenuService } from './categorie-retenu.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [CategorieRetenu] })
    ],
    providers:[CategorieRetenuResolver,CategorieRetenuService],
    exports:[CategorieRetenuService]
})
export class CategorieRetenuModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategorieRetenuModule } from '../categorie_retenu/categorie_retenu.module';
import { RetenuResolver } from './retenu.reesolver';
import { RetenuService } from './retenu.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Retenue] }),
        CategorieRetenuModule
    ],
    providers:[RetenuService,RetenuResolver],
    exports:[RetenuService]
})
export class RetenuSalarialModule {}

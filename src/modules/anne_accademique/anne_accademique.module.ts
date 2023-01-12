import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AnneeAccademique } from 'src/entities/annee-accademique.entity';
import { AnneeAccademiqueResolver } from './anne-accademique.resolver';
import { AnneeAccademiqueService } from './anne-accademique.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [AnneeAccademique] }),
    ],
    providers:[AnneeAccademiqueService,AnneeAccademiqueResolver],
    exports:[AnneeAccademiqueService]
})
export class AnneAccademiqueModule {}

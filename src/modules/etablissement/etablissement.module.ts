import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Etablissement } from 'src/entities/etablissement.entity';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Etablissement] }),
    ],
    providers:[],
    exports:[]
})
export class EtablissementModule {}

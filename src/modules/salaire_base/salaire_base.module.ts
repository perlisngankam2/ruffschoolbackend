import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SalaireBase } from 'src/entities/salaire-base.entity';
import { SalaireBaseResolver } from './salaire-base.resolver';
import { SalaireBaseService } from './salaire-base.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [SalaireBase] }),
    ],
    providers:[SalaireBaseService,SalaireBaseResolver],
    exports:[SalaireBaseService]
})
export class SalaireBaseModule {}

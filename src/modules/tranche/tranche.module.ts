import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Tranche } from 'src/entities/tranche.entity';
import { PensionModule } from '../pension/pension.module';
import { TrancheResolver } from './tranche.resolver';
import { TrancheService } from './tranche.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Tranche] }),
        PensionModule
    ],
    providers:[TrancheService,TrancheResolver],
    exports:[TrancheService]
})
export class TrancheModule {}

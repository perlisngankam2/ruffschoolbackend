import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Cycle } from 'src/entities/cycle.entity';
import { CycleResolver } from './cycle.resolver';
import { CycleService } from './cycle.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Cycle] }),
    ],
    providers:[CycleService,CycleResolver],
    exports:[CycleService]
})
export class CycleModule {}

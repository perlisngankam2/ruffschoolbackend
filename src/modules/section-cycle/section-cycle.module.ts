import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SectionCycle } from 'src/entities/section-cycle.entity';
import { CycleModule } from '../cycle/cycle.module';
import { CycleResolver } from '../cycle/cycle.resolver';
import { CycleService } from '../cycle/cycle.service';
import { SectionModule } from '../section/section.module';
import { SectionCycleResolver } from './section-cycle.resolver';
import { SectionCycleService } from './section-cycle.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [SectionCycle] }),
        SectionModule,
        CycleModule
    ],
    providers:[SectionCycleService,SectionCycleResolver],
    exports:[SectionCycleService]
})
export class SectionCycleModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Section } from 'src/entities/section.entity';
import { SectionResolver } from './section.resolver';
import { SectionService } from './section.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Section] }),
    ],
    providers:[SectionService,SectionResolver],
    exports:[SectionService]
})
export class SectionModule {}

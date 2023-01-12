import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Periode } from 'src/entities/periode.entity';
import { PeriodeResolver } from './periode.resolver';
import { PeriodeService } from './periode.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Periode] })
    ],
    providers:[PeriodeService,PeriodeResolver],
    exports:[PeriodeService]
})
export class PeriodeModule {}

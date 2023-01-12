import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PrimePersonnel } from 'src/entities/prime-personnel.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { PrimeModule } from '../prime/prime.module';
import { PrimePersonnelResolver } from './prime-personnel.resolver';
import { PrimePersonnelService } from './prime-personnel.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [PrimePersonnel] }),
        PrimeModule,
        PersonnelModule
    ],
    providers:[PrimePersonnelService,PrimePersonnelResolver],
    exports:[PrimePersonnelService]
})
export class PrimePersonnelModule {}

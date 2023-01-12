import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { TrancheStudent } from 'src/entities/tranche-student.entity';
import { AvanceTrancheModule } from '../avance_tranche/avance_tranche.module';
import { StudentModule } from '../student/student.module';
import { TrancheModule } from '../tranche/tranche.module';
import { TrancheService } from '../tranche/tranche.service';
import { TrancheStudentResolver } from './tranche-student.resolver';
import { TrancheStudentService } from './tranche-student.service';
import { TwilioModule } from 'nestjs-twilio';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [TrancheStudent] }),
        StudentModule,
        TrancheModule,
        forwardRef(() => AvanceTrancheModule),
        TwilioModule.forRoot({
            accountSid: "AC0a6add445c06ee381b4ab8ee989d8220",
            authToken: "af7324e6a2d2179aacda4e0ea12a3b5a",
          }),
    ],
    providers:[TrancheStudentService,TrancheStudentResolver],
    exports:[TrancheStudentService]
})
export class TrancheStudentModule {}

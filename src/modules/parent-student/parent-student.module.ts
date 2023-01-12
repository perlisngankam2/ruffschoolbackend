import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ParentStudent } from 'src/entities/parentStudent.entity';
import { ParentModule } from '../parent/parent.module';
import { StudentModule } from '../student/student.module';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [ParentStudent] }),
        StudentModule,
        ParentModule
    ],
    providers:[],
    exports:[]
})
export class ParentStudentModule {}

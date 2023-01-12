import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategorieEleve } from 'src/entities/categorie-eleve.entity';
import { Student } from 'src/entities/student.entity';
import { CategorieEleveModule } from '../categorie_eleve/categorie_eleve.module';
import { InscriptionModule } from '../inscription/inscription.module';
import { LocalisationModule } from '../localisation/localisation.module';
import { SalleModule } from '../salle/salle.module';
import { UserModule } from '../user/user.module';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
    imports:[
        MikroOrmModule.forFeature({ entities: [Student] }),
        // InscriptionModule,
        LocalisationModule,
        CategorieEleveModule,
        UserModule
    ],
    providers:[StudentService,StudentResolver],
    exports:[StudentService]
})
export class StudentModule {}

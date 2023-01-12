import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { PersonnelModule } from './modules/personnel/personnel.module';
import { SalaireBaseModule } from './modules/salaire_base/salaire_base.module';
import { PrimeModule } from './modules/prime/prime.module';
import { CategoriePrimeModule } from './modules/categorie_prime/categorie_prime.module';
import { CategoriePersonnelModule } from './modules/categorie_personnel/categorie_personnel.module';
import { PrimePersonnelModule } from './modules/prime_personnel/prime_personnel.module';
import { PeriodeModule } from './modules/periode/periode.module';
import { RetenuSalarialModule } from './modules/retenu_salarial/retenu_salarial.module';
import { CategorieRetenuModule } from './modules/categorie_retenu/categorie_retenu.module';
import { RetenuPersonnelModule } from './modules/retenu_personnel/retenu_personnel.module';
import { EtablissementModule } from './modules/etablissement/etablissement.module';
import { SectionModule } from './modules/section/section.module';
import { CycleModule } from './modules/cycle/cycle.module';
import { NiveauEtudeModule } from './modules/niveau_etude/niveau_etude.module';
import { SalleModule } from './modules/salle/salle.module';
import { AnneAccademiqueModule } from './modules/anne_accademique/anne_accademique.module';
import { CategorieEleveModule } from './modules/categorie_eleve/categorie_eleve.module';
import { TrancheModule } from './modules/tranche/tranche.module';
import { FraiExamenModule } from './modules/frai_examen/frai_examen.module';
import { AvanceTrancheModule } from './modules/avance_tranche/avance_tranche.module';
import { ReductionPensionModule } from './modules/reduction_pension/reduction_pension.module';
import { InscriptionModule } from './modules/inscription/inscription.module';
import { join } from 'path';
import { Logger,} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { SalaireModule } from './modules/salaire/salaire.module';
import { PensionModule } from './modules/pension/pension.module';
import { TrancheStudentModule } from './modules/tranche-student/tranche-student.module';
import { FraisInscriptionModule } from './modules/frais-inscription/frais-inscription.module';
import { ParentModule } from './modules/parent/parent.module';
import { SectionCycleModule } from './modules/section-cycle/section-cycle.module';
import { AvancePensionModule } from './modules/avance-pension/avance-pension.module';
import { AvanceInscriptionModule } from './modules/avance-inscription/avance-inscription.module';
import { AuthModule } from './modules/auth/auth.module';
import { ParentStudentModule } from './modules/parent-student/parent-student.module';
import { LocalisationModule } from './modules/localisation/localisation.module';



@Module({
  imports: [
    UserModule, 
    StudentModule, 
    PersonnelModule, 
    SalaireBaseModule, 
    PrimeModule, 
    CategoriePrimeModule, 
    CategoriePersonnelModule, 
    PrimePersonnelModule, 
    PeriodeModule, 
    RetenuSalarialModule, 
    CategorieRetenuModule, 
    RetenuPersonnelModule, 
    EtablissementModule, 
    SectionModule, 
    CycleModule, 
    NiveauEtudeModule, 
    SalleModule, 
    AnneAccademiqueModule, 
    CategorieEleveModule, 
    TrancheModule, 
    FraiExamenModule, 
    AvanceTrancheModule, 
    ReductionPensionModule, 
    InscriptionModule,
    SalaireModule,
    PensionModule,
    TrancheStudentModule,
    FraisInscriptionModule,
    ParentModule,
    SectionCycleModule,
    AvancePensionModule,
    AvanceInscriptionModule,

    ConfigModule.forRoot({ isGlobal: true }),
    // gestion de la base de doné
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
    }),

    // gestion grapQl
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cache: 'bounded',
      debug: false,
      playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),

    AuthModule,

    ParentStudentModule,

    LocalisationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

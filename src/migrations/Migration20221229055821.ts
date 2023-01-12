import { Migration } from '@mikro-orm/migrations';

export class Migration20221229055821 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "annee_accademique" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "annee_accademique" timestamptz(0) null);');

    this.addSql('create table "cycle" ("id" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "created_at" timestamptz(0) not null, constraint "cycle_pkey" primary key ("id"));');

    this.addSql('create table "etablissement" ("id" serial primary key, "description" varchar(255) null, "name" varchar(255) null, "image" varchar(255) null, "logo" varchar(255) null, "baniere" varchar(255) null, "create_at" timestamptz(0) null);');

    this.addSql('create table "localisation" ("id" varchar(255) not null, "ville" varchar(255) null, "region" varchar(255) null, "pays" varchar(255) null, "quartier" varchar(255) null, "longitude" varchar(255) null, "latitude" varchar(255) null, "bp" varchar(255) null, "created" timestamptz(0) not null, constraint "localisation_pkey" primary key ("id"));');

    this.addSql('create table "reduction_scolarite" ("id" serial primary key, "nom" varchar(255) null, "created_at" timestamptz(0) not null, "montant" int not null default 0);');

    this.addSql('create table "categorie_eleve" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "reduction_scolarite_id" int not null);');

    this.addSql('create table "section" ("id" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "created_at" timestamptz(0) not null, constraint "section_pkey" primary key ("id"));');

    this.addSql('create table "section_cycle" ("id" varchar(255) not null, "description" varchar(255) null, "created_at" timestamptz(0) not null, "cycle_id" varchar(255) null, "section_id" varchar(255) null, constraint "section_cycle_pkey" primary key ("id"));');

    this.addSql('create table "niveau_etude" ("id" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "created_at" timestamptz(0) not null, "section_cycle_id" varchar(255) null, constraint "niveau_etude_pkey" primary key ("id"));');

    this.addSql('create table "salle" ("id" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "effectif" int not null default 0, "created_at" timestamptz(0) not null, "niveau_id" varchar(255) null, constraint "salle_pkey" primary key ("id"));');

    this.addSql('create table "pension" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "montant" int not null default 0, "date_line" timestamptz(0) null, "salle_id" varchar(255) not null, "annee_accademique_id" int null);');
    this.addSql('alter table "pension" add constraint "pension_salle_id_unique" unique ("salle_id");');

    this.addSql('create table "frais_inscription" ("id" serial primary key, "montant" int not null default 0, "date_line" timestamptz(0) null, "annee_accademique_id" int null, "salle_id" varchar(255) null);');
    this.addSql('alter table "frais_inscription" add constraint "frais_inscription_salle_id_unique" unique ("salle_id");');

    this.addSql('create table "frais_examen" ("id" varchar(255) not null, "montant" int not null default 0, "date_line" timestamptz(0) null, "annee_accademique_id" int null, "salle_id" varchar(255) null, constraint "frais_examen_pkey" primary key ("id"));');
    this.addSql('alter table "frais_examen" add constraint "frais_examen_salle_id_unique" unique ("salle_id");');

    this.addSql('create table "tranche" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "date_line" timestamptz(0) null, "montant" int not null default 0, "pension_id" int not null);');

    this.addSql('create table "parent" ("id" serial primary key, "situation_matrimonial" varchar(255) null, "sexe" varchar(255) null, "birth_date" timestamptz(0) null, "fonction" varchar(255) null, "parent" boolean not null default false, "tuteur" boolean not null default false, "child_number" int not null default 0, "user_id" varchar(255) not null);');
    this.addSql('alter table "parent" add constraint "parent_user_id_unique" unique ("user_id");');

    this.addSql('create table "student" ("id" varchar(255) not null, "matricule" varchar(255) not null, "age" int null, "born_date" timestamptz(0) null, "fathert_name" varchar(255) null, "father_work" varchar(255) null, "mother_name" varchar(255) null, "mother_work" varchar(255) null, "tuteur" varchar(255) null, "old" boolean not null default false, "exclut" boolean not null default false, "last_school" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "salle_id" varchar(255) null, "categorie_id" int not null, "parent_id" int not null, "localisation_id" varchar(255) null, constraint "student_pkey" primary key ("id"));');
    this.addSql('alter table "student" add constraint "student_matricule_unique" unique ("matricule");');
    this.addSql('alter table "student" add constraint "student_user_id_unique" unique ("user_id");');

    this.addSql('create table "tranche_student" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "paiement_date" timestamptz(0) not null, "montant" int not null default 0, "student_id" varchar(255) not null, "tranche_id" int not null);');

    this.addSql('create table "avance_tranche" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "paiement_date" timestamptz(0) not null, "date_line" timestamptz(0) null, "montant" int not null default 0, "reste" int not null default 0, "tranche_student_id" int null);');

    this.addSql('create table "inscription" ("id" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "complete" boolean not null default false, "montant" int not null default 0, "reste" int not null default 0, "created_at" timestamptz(0) not null, "frais_inscription_id" int null, "student_id" varchar(255) null, "annee_accademique_id" int null, constraint "inscription_pkey" primary key ("id"));');

    this.addSql('create table "avance_inscription" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "paiement_date" timestamptz(0) not null, "date_line" timestamptz(0) null, "montant" int not null default 0, "reste" int not null default 0, "inscription_id" varchar(255) null);');

    this.addSql('alter table "categorie_eleve" add constraint "categorie_eleve_reduction_scolarite_id_foreign" foreign key ("reduction_scolarite_id") references "reduction_scolarite" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "section_cycle" add constraint "section_cycle_cycle_id_foreign" foreign key ("cycle_id") references "cycle" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "section_cycle" add constraint "section_cycle_section_id_foreign" foreign key ("section_id") references "section" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "niveau_etude" add constraint "niveau_etude_section_cycle_id_foreign" foreign key ("section_cycle_id") references "section_cycle" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "salle" add constraint "salle_niveau_id_foreign" foreign key ("niveau_id") references "niveau_etude" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "pension" add constraint "pension_salle_id_foreign" foreign key ("salle_id") references "salle" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "pension" add constraint "pension_annee_accademique_id_foreign" foreign key ("annee_accademique_id") references "annee_accademique" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "frais_inscription" add constraint "frais_inscription_annee_accademique_id_foreign" foreign key ("annee_accademique_id") references "annee_accademique" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "frais_inscription" add constraint "frais_inscription_salle_id_foreign" foreign key ("salle_id") references "salle" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "frais_examen" add constraint "frais_examen_annee_accademique_id_foreign" foreign key ("annee_accademique_id") references "annee_accademique" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "frais_examen" add constraint "frais_examen_salle_id_foreign" foreign key ("salle_id") references "salle" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "tranche" add constraint "tranche_pension_id_foreign" foreign key ("pension_id") references "pension" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "parent" add constraint "parent_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "student" add constraint "student_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "student" add constraint "student_salle_id_foreign" foreign key ("salle_id") references "salle" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "student" add constraint "student_categorie_id_foreign" foreign key ("categorie_id") references "categorie_eleve" ("id") on update cascade on delete SET NULL;');
    this.addSql('alter table "student" add constraint "student_parent_id_foreign" foreign key ("parent_id") references "parent" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "student" add constraint "student_localisation_id_foreign" foreign key ("localisation_id") references "localisation" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "tranche_student" add constraint "tranche_student_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "tranche_student" add constraint "tranche_student_tranche_id_foreign" foreign key ("tranche_id") references "tranche" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "avance_tranche" add constraint "avance_tranche_tranche_student_id_foreign" foreign key ("tranche_student_id") references "tranche_student" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "inscription" add constraint "inscription_frais_inscription_id_foreign" foreign key ("frais_inscription_id") references "frais_inscription" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "inscription" add constraint "inscription_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "inscription" add constraint "inscription_annee_accademique_id_foreign" foreign key ("annee_accademique_id") references "annee_accademique" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "avance_inscription" add constraint "avance_inscription_inscription_id_foreign" foreign key ("inscription_id") references "inscription" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "categorie_retenu" add column "type" text check ("type" in (\'TAXES\', \'COTISATIONS\', \'AUTRES\')) not null default \'AUTRES\';');

    this.addSql('alter table "salaire_base" drop column "nom";');

    this.addSql('alter table "categorie_personnel" add column "retenu_id" int not null;');
    this.addSql('alter table "categorie_personnel" add constraint "categorie_personnel_retenu_id_foreign" foreign key ("retenu_id") references "retenue" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "personnel" add column "status" varchar(255) null, add column "salle_id" varchar(255) null;');
    this.addSql('alter table "personnel" add constraint "personnel_salle_id_foreign" foreign key ("salle_id") references "salle" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "salaire" add column "personnel_id" int not null;');
    this.addSql('alter table "salaire" add constraint "salaire_personnel_id_foreign" foreign key ("personnel_id") references "personnel" ("id") on update cascade on delete CASCADE;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pension" drop constraint "pension_annee_accademique_id_foreign";');

    this.addSql('alter table "frais_inscription" drop constraint "frais_inscription_annee_accademique_id_foreign";');

    this.addSql('alter table "frais_examen" drop constraint "frais_examen_annee_accademique_id_foreign";');

    this.addSql('alter table "inscription" drop constraint "inscription_annee_accademique_id_foreign";');

    this.addSql('alter table "section_cycle" drop constraint "section_cycle_cycle_id_foreign";');

    this.addSql('alter table "student" drop constraint "student_localisation_id_foreign";');

    this.addSql('alter table "categorie_eleve" drop constraint "categorie_eleve_reduction_scolarite_id_foreign";');

    this.addSql('alter table "student" drop constraint "student_categorie_id_foreign";');

    this.addSql('alter table "section_cycle" drop constraint "section_cycle_section_id_foreign";');

    this.addSql('alter table "niveau_etude" drop constraint "niveau_etude_section_cycle_id_foreign";');

    this.addSql('alter table "salle" drop constraint "salle_niveau_id_foreign";');

    this.addSql('alter table "pension" drop constraint "pension_salle_id_foreign";');

    this.addSql('alter table "frais_inscription" drop constraint "frais_inscription_salle_id_foreign";');

    this.addSql('alter table "frais_examen" drop constraint "frais_examen_salle_id_foreign";');

    this.addSql('alter table "personnel" drop constraint "personnel_salle_id_foreign";');

    this.addSql('alter table "student" drop constraint "student_salle_id_foreign";');

    this.addSql('alter table "tranche" drop constraint "tranche_pension_id_foreign";');

    this.addSql('alter table "inscription" drop constraint "inscription_frais_inscription_id_foreign";');

    this.addSql('alter table "tranche_student" drop constraint "tranche_student_tranche_id_foreign";');

    this.addSql('alter table "student" drop constraint "student_parent_id_foreign";');

    this.addSql('alter table "tranche_student" drop constraint "tranche_student_student_id_foreign";');

    this.addSql('alter table "inscription" drop constraint "inscription_student_id_foreign";');

    this.addSql('alter table "avance_tranche" drop constraint "avance_tranche_tranche_student_id_foreign";');

    this.addSql('alter table "avance_inscription" drop constraint "avance_inscription_inscription_id_foreign";');

    this.addSql('drop table if exists "annee_accademique" cascade;');

    this.addSql('drop table if exists "cycle" cascade;');

    this.addSql('drop table if exists "etablissement" cascade;');

    this.addSql('drop table if exists "localisation" cascade;');

    this.addSql('drop table if exists "reduction_scolarite" cascade;');

    this.addSql('drop table if exists "categorie_eleve" cascade;');

    this.addSql('drop table if exists "section" cascade;');

    this.addSql('drop table if exists "section_cycle" cascade;');

    this.addSql('drop table if exists "niveau_etude" cascade;');

    this.addSql('drop table if exists "salle" cascade;');

    this.addSql('drop table if exists "pension" cascade;');

    this.addSql('drop table if exists "frais_inscription" cascade;');

    this.addSql('drop table if exists "frais_examen" cascade;');

    this.addSql('drop table if exists "tranche" cascade;');

    this.addSql('drop table if exists "parent" cascade;');

    this.addSql('drop table if exists "student" cascade;');

    this.addSql('drop table if exists "tranche_student" cascade;');

    this.addSql('drop table if exists "avance_tranche" cascade;');

    this.addSql('drop table if exists "inscription" cascade;');

    this.addSql('drop table if exists "avance_inscription" cascade;');

    this.addSql('alter table "categorie_personnel" drop constraint "categorie_personnel_retenu_id_foreign";');

    this.addSql('alter table "salaire" drop constraint "salaire_personnel_id_foreign";');

    this.addSql('alter table "categorie_retenu" drop column "type";');

    this.addSql('alter table "salaire_base" add column "nom" varchar(255) null;');

    this.addSql('alter table "categorie_personnel" drop column "retenu_id";');

    this.addSql('alter table "personnel" drop column "status";');
    this.addSql('alter table "personnel" drop column "salle_id";');

    this.addSql('alter table "salaire" drop column "personnel_id";');
  }

}

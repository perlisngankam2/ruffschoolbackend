import { Migration } from '@mikro-orm/migrations';

export class Migration20221223185112 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categorie_prime" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null);');

    this.addSql('create table "categorie_retenu" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null);');

    this.addSql('create table "periode" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "date_periode" timestamptz(0) null);');

    this.addSql('create table "prime" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "montant" int not null default 0, "categorie_prime_id" int not null);');

    this.addSql('create table "retenue" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "montant" int not null default 0, "categorie_retenu_id" int not null);');

    this.addSql('create table "salaire_base" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "montant" int not null default 0);');

    this.addSql('create table "categorie_personnel" ("id" serial primary key, "nom" varchar(255) null, "description" varchar(255) null, "prime_id" int not null, "salaire_base_id" int not null);');

    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) null, "password" varchar(255) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "name" varchar(255) not null, "phone_number" varchar(255) null, "active" boolean not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deactivated_at" timestamptz(0) null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "personnel" ("id" serial primary key, "situation_matrimonial" varchar(255) null, "sexe" varchar(255) null, "fonction" varchar(255) null, "date_of_start_work" timestamptz(0) null, "date_of_birth" timestamptz(0) null, "matricule" varchar(255) null, "child_number" int not null default 0, "user_id" varchar(255) not null, "categorie_id" int not null);');
    this.addSql('alter table "personnel" add constraint "personnel_user_id_unique" unique ("user_id");');

    this.addSql('create table "retenu_personnel" ("id" serial primary key, "created_at" timestamptz(0) not null, "retenue_id" int not null, "personnel_id" int not null);');

    this.addSql('create table "prime_personnel" ("id" serial primary key, "created_at" timestamptz(0) not null, "prime_id" int not null, "personnel_id" int not null);');

    this.addSql('create table "salaire" ("id" serial primary key, "description" varchar(255) null, "payer" boolean not null default false, "montant" int not null default 0, "periode_id" int not null, "prime_personnel_id" int not null, "retenu_personnel_id" int not null);');

    this.addSql('alter table "prime" add constraint "prime_categorie_prime_id_foreign" foreign key ("categorie_prime_id") references "categorie_prime" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "retenue" add constraint "retenue_categorie_retenu_id_foreign" foreign key ("categorie_retenu_id") references "categorie_retenu" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "categorie_personnel" add constraint "categorie_personnel_prime_id_foreign" foreign key ("prime_id") references "prime" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "categorie_personnel" add constraint "categorie_personnel_salaire_base_id_foreign" foreign key ("salaire_base_id") references "salaire_base" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "personnel" add constraint "personnel_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "personnel" add constraint "personnel_categorie_id_foreign" foreign key ("categorie_id") references "categorie_personnel" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "retenu_personnel" add constraint "retenu_personnel_retenue_id_foreign" foreign key ("retenue_id") references "retenue" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "retenu_personnel" add constraint "retenu_personnel_personnel_id_foreign" foreign key ("personnel_id") references "personnel" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "prime_personnel" add constraint "prime_personnel_prime_id_foreign" foreign key ("prime_id") references "prime" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "prime_personnel" add constraint "prime_personnel_personnel_id_foreign" foreign key ("personnel_id") references "personnel" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "salaire" add constraint "salaire_periode_id_foreign" foreign key ("periode_id") references "periode" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "salaire" add constraint "salaire_prime_personnel_id_foreign" foreign key ("prime_personnel_id") references "prime_personnel" ("id") on update cascade on delete SET NULL;');
    this.addSql('alter table "salaire" add constraint "salaire_retenu_personnel_id_foreign" foreign key ("retenu_personnel_id") references "retenu_personnel" ("id") on update cascade on delete SET NULL;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "prime" drop constraint "prime_categorie_prime_id_foreign";');

    this.addSql('alter table "retenue" drop constraint "retenue_categorie_retenu_id_foreign";');

    this.addSql('alter table "salaire" drop constraint "salaire_periode_id_foreign";');

    this.addSql('alter table "categorie_personnel" drop constraint "categorie_personnel_prime_id_foreign";');

    this.addSql('alter table "prime_personnel" drop constraint "prime_personnel_prime_id_foreign";');

    this.addSql('alter table "retenu_personnel" drop constraint "retenu_personnel_retenue_id_foreign";');

    this.addSql('alter table "categorie_personnel" drop constraint "categorie_personnel_salaire_base_id_foreign";');

    this.addSql('alter table "personnel" drop constraint "personnel_categorie_id_foreign";');

    this.addSql('alter table "personnel" drop constraint "personnel_user_id_foreign";');

    this.addSql('alter table "retenu_personnel" drop constraint "retenu_personnel_personnel_id_foreign";');

    this.addSql('alter table "prime_personnel" drop constraint "prime_personnel_personnel_id_foreign";');

    this.addSql('alter table "salaire" drop constraint "salaire_retenu_personnel_id_foreign";');

    this.addSql('alter table "salaire" drop constraint "salaire_prime_personnel_id_foreign";');

    this.addSql('drop table if exists "categorie_prime" cascade;');

    this.addSql('drop table if exists "categorie_retenu" cascade;');

    this.addSql('drop table if exists "periode" cascade;');

    this.addSql('drop table if exists "prime" cascade;');

    this.addSql('drop table if exists "retenue" cascade;');

    this.addSql('drop table if exists "salaire_base" cascade;');

    this.addSql('drop table if exists "categorie_personnel" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "personnel" cascade;');

    this.addSql('drop table if exists "retenu_personnel" cascade;');

    this.addSql('drop table if exists "prime_personnel" cascade;');

    this.addSql('drop table if exists "salaire" cascade;');
  }

}

import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { CategorieEleve } from './categorie-eleve.entity';
import { Inscription } from './inscription.entity';
import { Localisation } from './localisation.entity';
import { Parent } from './parent.entity';
import { ParentStudent } from './parentStudent.entity';
import { Salle } from './salle.entity';
import { TrancheStudent } from './tranche-student.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Student {
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ unique:true })
  matricule!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  age!: number;

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  birthdate!: Date | null;

  @Field({ defaultValue: false })
  @Property({ default:false })
  old!: boolean;

  @Field({ defaultValue: false })
  @Property({ default:false })
  exclut!: boolean;

  @Field({ defaultValue: false })
  @Property({ default:false })
  inscriptionComplete!: boolean;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastSchool!: string;
  
  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // Relations
  @OneToOne(() => User, (user) => user.student, {
    owner: true,
    unique: true,
    onDelete: 'CASCADE',
  })
  user!: IdentifiedReference<User>;

  @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'SET NULL'
  })
  salle!:IdentifiedReference<Salle>|null

  @ManyToOne(() => CategorieEleve ,{
    nullable:false,
    onDelete:'SET NULL'
  })
  categorie!:IdentifiedReference<CategorieEleve>|null

  @ManyToOne(() => Localisation ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  localisation!:IdentifiedReference<Localisation>|null

  // @ManyToOne(() => Inscription, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // inscription!: IdentifiedReference<Inscription> | null;

  @OneToOne(() => Inscription, (inscription) => inscription.student, {
    owner: false,
    nullable: true,
  })
  inscription!: IdentifiedReference<Inscription> | null;
  
  @OneToMany(()=>TrancheStudent, (tranche) => tranche.student)
  trancheStudent = new Collection<TrancheStudent>(this)

  @OneToMany(()=>ParentStudent, (parentStudent) => parentStudent.student)
  parentStudent = new Collection<ParentStudent>(this)
}
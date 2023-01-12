import {
  Collection,
    Entity,
    Enum,
    Filter,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
  } from '@mikro-orm/core';
  import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoriePersonnel } from './categorie-personnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';
import { RetenuPersonnel } from './retenu-personnel.entity';
import { Salle } from './salle.entity';
import { User } from './user.entity';


@Entity()
@ObjectType()
export class Personnel {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  situationMatrimonial!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sexe!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fonction!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  status!: string;

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  dateOfStartWork!: Date | null;

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  dateOfBirth!: Date | null;

  @Field({ nullable: true })
  @Property({ nullable: true })
  matricule!: string;

  @Field({ defaultValue: 0 })
  @Property({ default: 0 })
  childNumber!: number;

  //Relation with another table 
  @OneToOne(() => User, (user) => user.personnel, {
    owner: true,
    unique: true,
    onDelete: 'CASCADE',
  })
  user!: IdentifiedReference<User>;

  @ManyToOne(() => CategoriePersonnel ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  categorie!:IdentifiedReference<CategoriePersonnel>|null

// relation with another Entites
  @OneToMany(() => PrimePersonnel, prime => prime.personnel)
  prime = new Collection<PrimePersonnel>(this);

  @OneToMany(() => RetenuPersonnel, retenue => retenue.personnel)
  retenue = new Collection<RetenuPersonnel>(this);

  // only for categorie Teacher
  @ManyToOne(() => Salle ,{
    nullable:true,
    onDelete:'cascade'
  })
  salle!:IdentifiedReference<Salle>|null

}
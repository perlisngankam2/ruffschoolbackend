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
import { AnneeAccademique } from './annee-accademique.entity';
import { NiveauEtude } from './niveau-etude.entity';
import { Salaire } from './salaire.entity';
import { Salle } from './salle.entity';
import { Tranche } from './tranche.entity';


@Entity()
@ObjectType()
export class Pension {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

// relation with another Entites
  @OneToOne(() => Salle, (salle) => salle.pension, {
    owner: true,
    unique: true,
    onDelete: 'CASCADE',
  })
  salle!: IdentifiedReference<Salle> | null;

  // @OneToOne(() => NiveauEtude, (niveauEtude) => niveauEtude.pension, {
  //   owner: true,
  //   unique: true,
  //   onDelete: 'CASCADE',
  // })
  // niveauEtude!: IdentifiedReference<NiveauEtude>;

  @OneToMany(() => Tranche, tranche => tranche.pension)
  tranche = new Collection<Tranche>(this);

  @ManyToOne(() => AnneeAccademique ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  anneeAccademique!:IdentifiedReference<AnneeAccademique>|null
}
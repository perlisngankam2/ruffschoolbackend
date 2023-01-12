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
import { Personnel } from './pesonnel.entity';
import { TrancheStudent } from './tranche-student.entity';

@Entity()
@ObjectType()
export class AvanceTranche {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  reste!: number;

  @Field({ defaultValue: false })
  @Property({default:false})
  complete!: boolean;

  @ManyToOne(() => TrancheStudent ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  trancheStudent!:IdentifiedReference<TrancheStudent>|null
}
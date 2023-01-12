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


@Entity()
@ObjectType()
export class Etablissement{
  @Field(() => ID)
  @PrimaryKey()
  id!: number;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  image!: string | null;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  logo!: string | null;

  @Field(() => String, { nullable: true })
  @Property({ nullable: true })
  baniere!: string | null;

  @Field({ nullable: true })
  @Property({ nullable: true })
  createAt!: Date| null;
}
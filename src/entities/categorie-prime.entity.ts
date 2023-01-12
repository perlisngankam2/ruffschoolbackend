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
import { Prime } from './prime.entity';


@Entity()
@ObjectType()
export class CategoriePrime {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  // relation with another Entites
  @OneToMany(() => Prime, prime => prime.categoriePrime)
  prime = new Collection<Prime>(this);
  
}
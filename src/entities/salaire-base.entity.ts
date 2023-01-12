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


@Entity()
@ObjectType()
export class SalaireBase {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue: 0 })
  @Property({ default: 0 })
  montant!: number ;
  
// relation with another Entites
  @OneToMany(() => CategoriePersonnel, categorie => categorie.salaireBase)
  categoriePersonnel = new Collection<CategoriePersonnel>(this);
  
}
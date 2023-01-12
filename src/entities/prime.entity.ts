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
import { CategoriePrime } from './categorie-prime.entity';
import { Personnel } from './pesonnel.entity';
import { PrimePersonnel } from './prime-personnel.entity';


@Entity()
@ObjectType()
export class Prime {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  nom!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description!: string;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

// relation with another Entites
  @OneToMany(() => CategoriePersonnel, personnel => personnel.prime)
  personnel = new Collection<CategoriePersonnel>(this);

  @OneToMany(() => PrimePersonnel, prime_personnel => prime_personnel.prime)
  primePersonnel = new Collection<PrimePersonnel>(this);


  @ManyToOne(() => CategoriePrime ,{
    nullable:false,
    onDelete: 'CASCADE'
  })
  categoriePrime!:IdentifiedReference<CategoriePrime>|null

  
}
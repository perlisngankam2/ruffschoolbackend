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
import { Retenue } from './retenu-salaire.entity';
import { SalaireBase } from './salaire-base.entity';


@Entity()
@ObjectType()
export class CategoriePersonnel {
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
  @OneToMany(() => Personnel, personnel => personnel.categorie)
  personnel = new Collection<Personnel>(this);

  @ManyToOne(() => Prime ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  prime!:IdentifiedReference<Prime>|null

  @ManyToOne(() => Retenue,{
    nullable:false,
    onDelete:'CASCADE'
  })
  retenu!:IdentifiedReference<Retenue>|null

  @ManyToOne(() => SalaireBase ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  salaireBase!:IdentifiedReference<SalaireBase>|null
  
}
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
import { Salaire } from './salaire.entity';


@Entity()
@ObjectType()
export class RetenuPersonnel {
  @Field()
  @PrimaryKey()
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
  
  @ManyToOne(() => Retenue ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  retenue!:IdentifiedReference<Retenue>|null

  @ManyToOne(() => Personnel ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  personnel!:IdentifiedReference<Personnel>|null

  @ManyToOne(() => Salaire ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  salaire!:IdentifiedReference<Salaire>|null
}
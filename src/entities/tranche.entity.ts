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
import { Pension } from './pension.entity';
import { Personnel } from './pesonnel.entity';
import { TrancheStudent } from './tranche-student.entity';

@Entity()
@ObjectType()
export class Tranche {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field({nullable:true})
  @Property({nullable:true})
  name!: string;

  @Field({nullable:true})
  @Property({nullable:true})
  description!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @OneToMany(()=>TrancheStudent, (trancheStudent) => trancheStudent.tranche)
  trancheStudent = new Collection<TrancheStudent>(this)

  @ManyToOne(() => Pension ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  pension!:IdentifiedReference<Pension>|null
}
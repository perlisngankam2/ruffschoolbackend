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
import { Inscription } from './inscription.entity';

@Entity()
@ObjectType()
export class AvanceInscription {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  description!: string;

  @Field(() => Date)
  @Property({ onCreate: () => new Date() })
  paiementDate = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  dateLine!: Date | null;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field({ defaultValue: false })
  @Property({default:false})
  complete!: boolean;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  reste!: number;

  @ManyToOne(() => Inscription ,{
    nullable:true,
    onDelete:'CASCADE'
  })
  inscription!:IdentifiedReference<Inscription>|null
}
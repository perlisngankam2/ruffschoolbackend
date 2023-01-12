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
import { AvanceTranche } from './avance-tranche.entity';
import { Student } from './student.entity';
import { Tranche } from './tranche.entity';

export enum RegimePaiement {
  SPECIAL = 'SPECIAL',
  NORMAL = 'NORMAL',
}

@Entity()
@ObjectType()
export class TrancheStudent {
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

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  montant!: number;

  @Field()
  @Enum({
    items: () => RegimePaiement,
    default: RegimePaiement.NORMAL,
  })
  regimePaimemnt!: RegimePaiement;

  @Field({defaultValue:false})
  @Property({default:false})
  complete!: boolean;

  @Field({ defaultValue:0 })
  @Property({ default:0 })
  reste!: number;

  @ManyToOne(() => Student ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  student!:IdentifiedReference<Student>|null

  @ManyToOne(() => Tranche ,{
    nullable:false,
    onDelete:'CASCADE'
  })
  tranche!:IdentifiedReference<Tranche>|null

  @OneToMany(()=>AvanceTranche, (avance) => avance.trancheStudent)
  avancheTranche = new Collection<AvanceTranche>(this)

}
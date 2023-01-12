import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NiveauEtude } from './niveau-etude.entity';
import { SectionCycle } from './section-cycle.entity';
import { Section } from './section.entity';


@Entity()
@ObjectType()
export class Cycle{
    @Field(() => ID)
    @PrimaryKey()
    id!: number;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name  !: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @OneToMany(() => SectionCycle, (sectionCycle) => sectionCycle.cycle)
    sectionCycle = new Collection<SectionCycle>(this);
    
   }
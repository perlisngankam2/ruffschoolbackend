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
import { Cycle } from './cycle.entity';
import { NiveauEtude } from './niveau-etude.entity';
import { Section } from './section.entity';


@Entity()
@ObjectType()
export class SectionCycle {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

    @ManyToOne(() => Cycle, {
        nullable: true,
        onDelete: 'CASCADE',
      })
    cycle!: IdentifiedReference<Cycle> | null;

    @ManyToOne(() => Section, {
        nullable: true,
        onDelete: 'CASCADE',
      })
    section!: IdentifiedReference<Section> | null;

    @OneToMany(() => NiveauEtude, (niveau) => niveau.sectionCycle)
    niveau = new Collection<NiveauEtude>(this);
}
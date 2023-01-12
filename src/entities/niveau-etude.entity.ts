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
import { FraisExamen } from './frais-exament.entity';
import { FraisInscription } from './frais-inscription.entity';
import { Pension } from './pension.entity';
import { Salle } from './salle.entity';
import { SectionCycle } from './section-cycle.entity';


@Entity()
@ObjectType()
export class NiveauEtude{
    @Field(() => ID)
    @PrimaryKey()
    id!: number;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();

// relation entities
  // @OneToOne(() => Pension, (pension) => pension.niveauEtude, {
  //     owner: false,
  //     nullable: true,
  //   })
  // pension!: IdentifiedReference<Pension> | null;

  // @OneToOne(() => FraisExamen, (fraisExamen) => fraisExamen.niveauEtude, {
  //     owner: false,
  //     nullable: true,
  //   })
  // fraisExamen!: IdentifiedReference<FraisExamen> | null;

  // @OneToOne(() => FraisInscription, (fraisInscription) => fraisInscription.niveauEtude, {
  //     owner: false,
  //     nullable: true,
  //   })
  // fraisInscription!: IdentifiedReference<FraisInscription> | null;


  @ManyToOne(() => SectionCycle, {
        nullable: true,
        onDelete: 'CASCADE',
      })
  sectionCycle!: IdentifiedReference<SectionCycle> | null;

  @OneToMany(() => Salle, (salle) => salle.niveau)
    salle = new Collection<Salle>(this);
    
}
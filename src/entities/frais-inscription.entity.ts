import {
    Collection,
    Entity,
    Enum,
    IdentifiedReference,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AnneeAccademique } from './annee-accademique.entity';
import { Inscription } from './inscription.entity';
import { NiveauEtude } from './niveau-etude.entity';
import { Salle } from './salle.entity';


@Entity()
@ObjectType()
export class FraisInscription{
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @Field({ defaultValue: 0 })
    @Property({default:0})
    montant!: number;

    @Field(() => Date, { nullable: true })
    @Property({ nullable: true })
    dateLine!: Date | null;


    // relation entity1001
    @ManyToOne(() => AnneeAccademique ,{
        nullable:true,
        onDelete:'CASCADE'
      })
    anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

   
    @OneToOne(() => Salle, (salle) => salle.fraisInscription, {
        owner: true,
        unique: true,
        onDelete: 'CASCADE',
      })
    salle!: IdentifiedReference<Salle> | null;

    @OneToMany(()=> Inscription, (inscription) => inscription.fraisInscription)
    inscription = new Collection<Inscription>(this)


    // @OneToOne(() => NiveauEtude, (niveaEtude) => niveaEtude.fraisInscription, {
    //     owner: true,
    //     unique: true,
    //     onDelete: 'CASCADE',
    //   })
    // niveauEtude!: IdentifiedReference<NiveauEtude> | null;
}
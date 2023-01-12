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
import { AvanceInscription } from './avance-inscription.entity';
import { FraisInscription } from './frais-inscription.entity';
import { Salle } from './salle.entity';
import { Student } from './student.entity';


@Entity()
@ObjectType()
export class Inscription{
    @Field(() => ID)
    @PrimaryKey()
    id!: number;
  
    @Field({ nullable: true })
    @Property({nullable:true})
    name!: string;

    @Field({ nullable: true })
    @Property({nullable:true})
    description!: string;

    @Field({ defaultValue: false })
    @Property({default:false})
    complete!: boolean;

    @Field({ defaultValue: 0 })
    @Property({default:0})
    montant!: number;

    @Field({ defaultValue: 0 })
    @Property({default:0})
    reste!: number;

    @Property({ onCreate: () => new Date() })
    createdAt = new Date();
    
    // relation entity
    @OneToOne(() => Student, (student) => student.inscription, {
      owner: true,
      unique: true,
      onDelete: 'CASCADE',
    })
    student!: IdentifiedReference<Student> | null;
   
    @OneToMany(()=> AvanceInscription, (avanceInscription) => avanceInscription.inscription)
    avanceInscription = new Collection<AvanceInscription>(this)

    @ManyToOne(() => FraisInscription ,{
      nullable:true,
      onDelete:'CASCADE'
    })
    fraisInscription!:IdentifiedReference<FraisInscription>|null
   
    // @ManyToOne(() => FraisInscription ,{
    //   nullable:true,
    //   onDelete:'CASCADE'
    // })
    // fraisInscription!:IdentifiedReference<FraisInscription>|null
   
   
    @ManyToOne(() => AnneeAccademique ,{
        nullable:true,
        onDelete:'CASCADE'
      })
    anneeAccademique!:IdentifiedReference<AnneeAccademique>|null

    
}
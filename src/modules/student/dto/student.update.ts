import { Field, InputType } from '@nestjs/graphql';
import { CategorieEleveCreateInput } from 'src/modules/categorie_eleve/dto/categorie-eleve.input';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { LocalisationCreateInput } from 'src/modules/localisation/dto/localisation.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class StudentUpdateInput {
  @Field({nullable:true})
  ID!: number;

  @Field({nullable:true})
  matricule!: string;

  @Field({nullable:true})
  birthdate!: Date;

  @Field({nullable:true})
  lastSchool!: string;

  @Field({defaultValue:false})
  exclut!: boolean;

  @Field({defaultValue:false})
  old!: boolean;

  @Field({nullable:true})
  user!: UserCreateInput;

  @Field({nullable:true})
  salle!: SalleCreateInput;

  @Field({nullable:true})
  categorie!: CategorieEleveCreateInput;

  @Field({nullable:true})
  localisation!: LocalisationCreateInput;

}

import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';

@InputType()
export class UpdateFraisInscriptionInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({})
  dateLine?: Date;

  @Field({nullable:true})
  niveauEtude?:NiveauEtudeCreateInput

  @Field()
  salle?:SalleCreateInput

  @Field()
  anneeAccademique?:AnneeAccademiqueCreateInput
}

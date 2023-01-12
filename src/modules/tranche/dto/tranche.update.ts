import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';
import { SalleCreateInput } from 'src/modules/salle/dto/salle.input';

@InputType()
export class TrancheUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({})
  dateLine?: Date;

  @Field()
  pension?:PensionCreateInput
}

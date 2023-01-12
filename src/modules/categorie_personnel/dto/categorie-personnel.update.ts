import { Field, ID, InputType } from '@nestjs/graphql';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';
import { SalaireBaseCreateInput } from 'src/modules/salaire_base/dto/salaire-base.input';

@InputType()
export class CategoriePersonnelUpdate {
 
  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  prime?: PrimeCreateInput;

  @Field({nullable:true})
  retenu?: RetenuCreateInput;

  @Field({nullable:true})
  salaireBase?: SalaireBaseCreateInput;

}

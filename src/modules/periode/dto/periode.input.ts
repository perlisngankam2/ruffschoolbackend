import { Field, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';

@InputType()
export class PeriodeCreateInput {
  @Field({nullable:true})
  ID?: string;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  datePeriode?: Date;

}

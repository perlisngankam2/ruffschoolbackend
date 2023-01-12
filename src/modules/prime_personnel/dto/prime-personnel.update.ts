import { Field, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';

@InputType()
export class PrimePersonnelUpdateInput {
  @Field({nullable:true})
  ID?: string;

  @Field()
  prime?:PrimeCreateInput;

  @Field()
  personnnel?:PersonnelCreateInput
}

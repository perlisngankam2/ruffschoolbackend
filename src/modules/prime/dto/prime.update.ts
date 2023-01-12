import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';

@InputType()
export class PrimeUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  nom?: string;

  @Field(() => ID, { nullable: true })
  categorieId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field()
  categoriePirme?:CategoriePrimeCreateInput
}

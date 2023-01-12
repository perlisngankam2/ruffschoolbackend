import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePrimeCreateInput } from 'src/modules/categorie_prime/dto/categorie-prime.input';
import { CategorieRetenuCreateInput } from 'src/modules/categorie_retenu/dto/categorie-retenu.input';

@InputType()
export class RetenuCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  nom?: string;

  @Field({ nullable: true })
  categorieId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field()
  categorieRetenu?:CategorieRetenuCreateInput
}

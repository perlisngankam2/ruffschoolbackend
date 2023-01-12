import { Field, ID, InputType } from '@nestjs/graphql';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';

@InputType()
export class SalaireBaseUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({ nullable: true })
  categorieId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field()
  categoriePersonnel?:CategoriePersonnelCreateInput
}

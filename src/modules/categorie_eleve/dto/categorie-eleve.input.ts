import { Field, ID, InputType } from '@nestjs/graphql';
import { RedutionScolariteInput } from 'src/modules/reduction_pension/dto/reduction-scolarite.input';
import { UpdateReductionScolariteInput } from 'src/modules/reduction_pension/dto/reduction-scolarite.update';

@InputType()
export class CategorieEleveCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  reduction?: RedutionScolariteInput;
}

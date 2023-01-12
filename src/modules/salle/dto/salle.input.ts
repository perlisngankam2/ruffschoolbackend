import { Field, ID, InputType } from '@nestjs/graphql';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';

@InputType()
export class SalleCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  effectif?: number;

  @Field({})
  niveau: NiveauEtudeCreateInput
}

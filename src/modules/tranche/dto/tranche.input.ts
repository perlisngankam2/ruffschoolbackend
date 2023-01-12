import { Field, ID, InputType } from '@nestjs/graphql';
import { PensionCreateInput } from 'src/modules/pension/dto/pension.input';

@InputType()
export class TrancheCreateInput {
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

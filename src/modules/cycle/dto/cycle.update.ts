import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CycleUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  effectif?: number;  
}

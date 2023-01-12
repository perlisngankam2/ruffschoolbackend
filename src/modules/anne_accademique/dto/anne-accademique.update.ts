/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AnneeAccademiqueCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  anneeAccademique?: Date;

}

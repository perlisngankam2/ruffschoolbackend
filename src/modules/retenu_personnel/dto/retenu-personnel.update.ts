import { Field, InputType } from '@nestjs/graphql';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { RetenuCreateInput } from 'src/modules/retenu_salarial/dto/retenu.input';

@InputType()
export class RetenuPersonnelUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field()
  retenu?:RetenuCreateInput;

  @Field()
  personnnel?:PersonnelCreateInput
}

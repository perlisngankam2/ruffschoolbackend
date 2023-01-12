import { Field, ID, InputType } from '@nestjs/graphql';
import { CycleCreateInput } from 'src/modules/cycle/dto/cycle.input';
import { SectionCreateInput } from 'src/modules/section/dto/section.input';

@InputType()
export class SectionCycleCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;


  @Field({nullable:true})
  cycle?: CycleCreateInput;

  
  @Field({nullable:true})
  section?: SectionCreateInput;

}

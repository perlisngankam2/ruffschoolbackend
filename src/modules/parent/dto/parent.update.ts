import { Field, ID, InputType } from '@nestjs/graphql';
import { SectionCycleCreateInput } from 'src/modules/section-cycle/dto/section-cycle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class ParentUpdateInput {
 
  @Field({nullable:true})
  ID?: number;
  
  @Field({nullable:true})
  sexe?: string;

  @Field({nullable:true})
  situationMatrimonial?: string;

  @Field({defaultValue:false})
  tuteur?: boolean;

  @Field({defaultValue:false})
  parent?: boolean;

  @Field({nullable:true})
  birthDate?: Date;

  @Field({defaultValue:0})
  childNumber?: number;

  @Field({nullable:true})
  user:UserCreateInput
}
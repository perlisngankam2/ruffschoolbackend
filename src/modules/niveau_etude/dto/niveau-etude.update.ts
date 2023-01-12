import { Field, ID, InputType } from '@nestjs/graphql';
import { TypeRetenu } from 'src/entities/categorie-retenu.entity';
import { User } from 'src/entities/user.entity';
import { SectionCycleCreateInput } from 'src/modules/section-cycle/dto/section-cycle.input';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class NiveauEtudeUpdateInput {
 
  @Field({nullable:true})
  ID?: number;
  
  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({nullable:true})
  sectionCycle:SectionCycleCreateInput
}
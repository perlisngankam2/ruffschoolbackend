import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class CategoriePrimeUpdate {
 
  @Field({nullable:true})
  nom?: string;

  @Field({nullable:true})
  description?: string;
}

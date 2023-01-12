import { Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserCreateInput } from 'src/modules/user/dto/user.input';

@InputType()
export class PersonnelUpdateInput {
  @Field({nullable:true})
  ID?: number;
  
  @Field({nullable:true})
  situationMatrimonial!: string;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field({nullable:true})
  sexe?: string;

  @Field({nullable:true})
  fonction?: string;

  @Field({nullable:true})
  matricule?: string;

  @Field({defaultValue:0})
  childNumber?: number;

  @Field({nullable:true})
  dateOfBirth!: Date;

  @Field(() => String, { nullable: true })
  dateOfStartWork?: Date;

  @Field()
  user?: UserCreateInput
}

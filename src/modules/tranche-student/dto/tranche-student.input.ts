import { Field, ID, InputType } from '@nestjs/graphql';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class TrancheStudentCreateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field()
  regimePaimemnt?: RegimePaiement;

  @Field({defaultValue:0})
  montant?: number;

  @Field()
  student?:StudentCreateInput
  
  @Field()
  tranche?:TrancheCreateInput
}

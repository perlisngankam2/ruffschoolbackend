import { Field, ID, InputType } from '@nestjs/graphql';
import { Inscription } from 'src/entities/inscription.entity';
import { RegimePaiement } from 'src/entities/tranche-student.entity';
import { InscriptionInput } from 'src/modules/inscription/dto/inscription.input';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';
import { TrancheCreateInput } from 'src/modules/tranche/dto/tranche.input';

@InputType()
export class AvanceInscriptionUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({defaultValue:0})
  reste?: number;

  @Field()
  inscription?:InscriptionInput
}

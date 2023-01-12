import { Field, ID, InputType } from '@nestjs/graphql';
import { AnneeAccademiqueCreateInput } from 'src/modules/anne_accademique/dto/anne-accademique.update';
import { NiveauEtudeCreateInput } from 'src/modules/niveau_etude/dto/niveau-etude.input';
import { StudentCreateInput } from 'src/modules/student/dto/student.input';

@InputType()
export class InscriptionInput {
  @Field({nullable:true})
  ID?: number;

  @Field({nullable:true})
  name?: string;

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:0})
  montant?: number;

  @Field({})
  dateLine?: Date;

  @Field({nullable:true})
  fraisInscription?:NiveauEtudeCreateInput

  @Field({nullable:true})
  student?:StudentCreateInput

  @Field()
  anneeAccademique?:AnneeAccademiqueCreateInput
}

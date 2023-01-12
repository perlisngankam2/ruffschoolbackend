import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';

@InputType()
export class SalaireUpdateInput {
  @Field({nullable:true})
  ID?: number;

  @Field({ nullable: true })
  categorieId:string

  @Field({nullable:true})
  description?: string;

  @Field({defaultValue:false})
  payer?: boolean;

  @Field({defaultValue:0})
  montant?: number;

  @Field({defaultValue:0})
  periode?: Periode;

  @Field({defaultValue:0})
  prime?: Prime;

  @Field({defaultValue:0})
  retenu?: Retenue;

}

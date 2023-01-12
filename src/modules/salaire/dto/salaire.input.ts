import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';
import { PeriodeCreateInput } from 'src/modules/periode/dto/periode.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { PrimePersonnelCreateInput } from 'src/modules/prime_personnel/dto/prime-personnel.input';
import { RetenuPersonnelCreateInput } from 'src/modules/retenu_personnel/dto/retenu-personnel.input';

@InputType()
export class SalaireCreateInput {
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

  @Field({nullable:true})
  periode?: PeriodeCreateInput;

  @Field({})
  personnel?: PersonnelCreateInput;

  @Field({nullable:true})
  prime?: PrimePersonnelCreateInput;

  @Field({nullable:true})
  retenu?: RetenuPersonnelCreateInput;

}

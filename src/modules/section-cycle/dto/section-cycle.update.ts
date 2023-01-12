import { Field, ID, InputType } from '@nestjs/graphql';
import { Periode } from 'src/entities/periode.entity';
import { Prime } from 'src/entities/prime.entity';
import { Retenue } from 'src/entities/retenu-salaire.entity';
import { CategoriePersonnelCreateInput } from 'src/modules/categorie_personnel/dto/categorie-personnel.input';
import { CycleCreateInput } from 'src/modules/cycle/dto/cycle.input';
import { PeriodeCreateInput } from 'src/modules/periode/dto/periode.input';
import { PersonnelCreateInput } from 'src/modules/personnel/dto/personnel.input';
import { PrimeCreateInput } from 'src/modules/prime/dto/prime.input';
import { PrimePersonnelCreateInput } from 'src/modules/prime_personnel/dto/prime-personnel.input';
import { RetenuPersonnelCreateInput } from 'src/modules/retenu_personnel/dto/retenu-personnel.input';
import { SectionCreateInput } from 'src/modules/section/dto/section.input';

@InputType()
export class SectionCycleUpdateInput {
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

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocalisationCreateInput {
  @Field({nullable:true})
  ID!: number;

  @Field({nullable:true})
  ville!: string;

  @Field({nullable:true})
  region!: string;

  @Field({nullable:true})
  pays!: string;

  @Field({nullable:true})
  quartier!: string;

  @Field({nullable:true})
  bp!: string;

  @Field({ defaultValue: 0 })
  latitude?: number;

  @Field({ defaultValue: 0 })
  longitude?: number;

}

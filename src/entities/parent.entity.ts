import {
    Collection,
      Entity,
      Enum,
      Filter,
      IdentifiedReference,
      ManyToOne,
      OneToMany,
      OneToOne,
      PrimaryKey,
      Property,
      Unique,
    } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ParentStudent } from './parentStudent.entity';
import { Student } from './student.entity';
import { User } from './user.entity';
  
  
@Entity()
@ObjectType()
export class Parent {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field({ nullable: true })
    @Property({ nullable: true })
    situationMatrimonial!: string;

    @Field({ nullable: true })
    @Property({ nullable: true })
    sexe!: string;

    @Property({ nullable: true })
    @Field(() => Date, { nullable: true })
    birthDate!: Date | null;

    @Field({ nullable: true })
    @Property({ nullable: true })
    fonction!: string;

    @Field({ defaultValue: false })
    @Property({ default: false })
    parent!: boolean;

    @Field({ defaultValue: false })
    @Property({ default: false })
    tuteur!: boolean;

    @Field({ defaultValue: 0 })
    @Property({ default: 0 })
    childNumber!: number;

    //Relation with another table 
    @OneToOne(() => User, (user) => user.parent, {
        owner: true,
        unique: true,
        onDelete: 'CASCADE',
    })
    user!: IdentifiedReference<User>;

    @OneToMany(() => ParentStudent, parentStudent => parentStudent.parent)
    parentStudent = new Collection<ParentStudent>(this);
}
import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/entities/student.entity';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';
import { StudentService } from './student.service';


@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('student') Input: StudentCreateInput) {
    return this.studentService.create(Input);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('input') input: StudentCreateInput,

    ) {
    const student = await this.studentService.findByOne({id:input.ID})

    return this.studentService.update(student,input);
  }

  @Query(() => [Student])
  findAll() {
    return this.studentService.getAll()
  }
  
  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findByOne(+id);
  }
}

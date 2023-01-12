/* eslint-disable prettier/prettier */
import { EntityManager, EntityRepository, FilterQuery, NotFoundError, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcript from 'bcrypt';
import { PersonnelCreateInput } from './dto/personnel.input';
import { Personnel } from 'src/entities/pesonnel.entity';
import { PersonnelUpdateInput } from './dto/personnel.update';
import { UserService } from '../user/user.service';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private personnelRepository: EntityRepository<Personnel>,
    private readonly em: EntityManager,
    private userService: UserService
  ) {}

  async createPersonnel(
    input: PersonnelCreateInput,
  ): Promise<Personnel> {

    const user = input.userId
    ? await this.userService.findById(input.userId)
    : await this.userService.create(input.user)

  if (!user) {
    throw new NotFoundError('user not found'|| '');
  }

    const new_personnel = new Personnel()
    new_personnel.matricule = input.matricule
    new_personnel.childNumber = input.childNumber
    new_personnel.sexe = input.sexe
    new_personnel.dateOfStartWork = input.dateOfStartWork
    new_personnel.fonction = input.fonction

    await this.personnelRepository.persistAndFlush(new_personnel)
    return new_personnel
  }
    findById(arg0: { id: import("../user/dto/user.input").UserCreateInput; }) {
        throw new Error('Method not implemented.');
    }

  findByOne(filters: FilterQuery<Personnel>): Promise<Personnel | null> {
    return this.personnelRepository.findOne(filters);
  }

  getAll(): Promise<Personnel[]> {
    return this.personnelRepository.findAll()
  }
  
  async update(personnel: Personnel, input: PersonnelUpdateInput): Promise<Personnel> {
    if (input.user) {
      const user =
      input.user?.ID &&
        (await this.userService.findByOne({ id: input.user?.ID }));

      if (!user) {
        throw new NotFoundError('user not found' || '');
      }
      this.userService.update(user, input.user);
    }    
    wrap(personnel).assign({
      matricule: input.matricule || personnel.matricule,
      situationMatrimonial: input.situationMatrimonial || personnel.situationMatrimonial,
      sexe: input.sexe || personnel.sexe,
      fonction: input.fonction || personnel.fonction,
      childNumber: input.childNumber || personnel.childNumber,
      dateOfBirth: input.dateOfBirth || personnel.dateOfBirth,
      dateOfStartWork: input.dateOfStartWork || personnel.dateOfStartWork
    },
    { em: this.em },
    );

    await this.personnelRepository.persistAndFlush(personnel);

    return personnel;
  }

  async deleteUser(){

  }

}
















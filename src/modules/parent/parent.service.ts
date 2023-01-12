import {
    Collection,
    Entity,
    EntityManager,
    EntityRepository,
    Enum,
    Filter,
    FilterQuery,
    IdentifiedReference,
    ManyToOne,
    NotFoundError,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
    wrap,
  } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Field, ID, ObjectType} from '@nestjs/graphql';
import { Parent } from 'src/entities/parent.entity';
import { UserService } from '../user/user.service';
import { ParentCreateInput } from './dto/parent.input';
import { ParentUpdateInput } from './dto/parent.update';

@Entity()
@ObjectType()
export class ParentService {
    constructor(
        @InjectRepository(Parent)
        private parentRepository: EntityRepository<Parent>,
        private userService : UserService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: ParentCreateInput,
      ): Promise<Parent> {        
        const parent = new Parent()

        const user = input.user
                ? await this.userService.findByOne(input.user)
                : await this.userService.create(input.user)

        parent.birthDate = input.birthDate
        parent.childNumber = input.childNumber || null
        parent.sexe = input.sexe
        parent.situationMatrimonial = input.situationMatrimonial
        parent.tuteur = input.tuteur
        parent.parent = input.parent
        parent.fonction = parent.fonction
        parent.user.id = user.id
        
        await this.parentRepository.persistAndFlush(parent)
        return parent
      }
    
      findByOne(filters: FilterQuery<Parent>): Promise<Parent | null> {
        return this.parentRepository.findOne(filters);
      }
      findById(id:string){
        return this.parentRepository.findOne(+id)
      }
    
      getAll(): Promise<Parent[]> {
        return this.parentRepository.findAll()
      }
      
      async update(parent: Parent, input: ParentUpdateInput): Promise<Parent> {
        if(input.user){
            const user =
            input.user?.ID &&
              (await this.userService.findByOne({ id: input.user?.ID }));

              if (!user) {
                throw new NotFoundError('user no exist' || '');
              }
              this.userService.update(user, input.user);
        }
        wrap(parent).assign({
            sexe: input.sexe || parent.sexe,
            situationMatrimonial: input.situationMatrimonial || parent.situationMatrimonial,
            tuteur:input.tuteur || parent.tuteur,
            parent:input.parent || parent.parent,
            birthDate:input.birthDate || parent.birthDate,
            },
            { em: this.em },
    );
        await this.parentRepository.persistAndFlush(parent);
        return parent;
      }
      async deletePrime(){
        
      }   
}
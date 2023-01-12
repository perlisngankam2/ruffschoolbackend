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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Pension } from 'src/entities/pension.entity';
import { Student } from 'src/entities/student.entity';
import { CategorieEleveService } from '../categorie_eleve/categorie-eleve.service';
import { InscriptionService } from '../inscription/inscription.service';
import { LocalisationService } from '../localisation/localisation.service';
import { SalleService } from '../salle/salle.service';
import { UserService } from '../user/user.service';
import { StudentCreateInput } from './dto/student.input';
import { StudentUpdateInput } from './dto/student.update';

@Entity()
@ObjectType()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: EntityRepository<Student>,
        // private salleService: SalleService,
        private localisationService: LocalisationService,
        private categorieService: CategorieEleveService,
        // private inscriptionService: InscriptionService,
        private userService: UserService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: StudentCreateInput,
      ): Promise<Student> {  
        const student = new Student()

        const localisation = input.localisation
            ? await this.localisationService.findByOne({id:input.localisation.ID})
            : await this.localisationService.create(input.localisation)
        
        // const inscription = input.inscription
        //     ? await this.inscriptionService.findByOne({id:input.inscription.ID})
        //     : await this.inscriptionService.create(input.inscription)

        // const salle = input.salle
        //     ? await this.salleService.findByOne({id:input.salle.ID})
        //     : await this.salleService.create(input.salle)
        
        const categorie = input.categorie
            ? await this.categorieService.findByOne({id:input.categorie.ID})
            : await this.categorieService.create(input.categorie)
        
        const user = input.user
            ? await this.userService.findByOne({id:input.user.ID})
            : await this.userService.create(input.user)

        student.matricule = input.matricule
        student.birthdate = input.birthdate
        student.lastSchool = input.lastSchool || null
        student.old = input.old,
        student.exclut = input.exclut,
        // student.salle.id = salle.id,
        // student.inscription.id = inscription.id,
        student.user.id = user.id,
        student.localisation.id = localisation.id
        
        await this.studentRepository.persistAndFlush(student)
        return student
      }
    
      findByOne(filters: FilterQuery<Student>): Promise<Student | null> {
        return this.studentRepository.findOne(filters);
      }
      findById(id:string){
        return this.studentRepository.findOne(+id)
      }
    
      getAll(): Promise<Student[]> {
        return this.studentRepository.findAll()
      }
      
      async update(student: Student, input: StudentUpdateInput): Promise<Student> {
        
        if (input.localisation) {
            const localisation =
            input.localisation?.ID &&
              (await this.localisationService.findByOne({ id: input.localisation?.ID }));
      
            if (!localisation) {
              throw new NotFoundError('localisation no exist' || '');
            }
            this.localisationService.update(localisation, input.localisation);
        }

        if (input.user) {
            const user =
            input.user?.ID &&
              (await this.userService.findByOne({ id: input.user?.ID }));
      
            if (!user) {
              throw new NotFoundError('user no exist' || '');
            }
            this.userService.update(user, input.user);
        }
        
        wrap(student).assign({
            matricule:input.matricule || student.matricule,
            birthdate: input.birthdate || student.birthdate,
            exclut: input.exclut || student.exclut,
            old: input.old || student.old,
            lastSchool:input.lastSchool || student.lastSchool,
        },
        { em: this.em },
    );
        await this.studentRepository.persistAndFlush(student);
        return student;
      }

    async deleteStuden(){
        
      }   
}
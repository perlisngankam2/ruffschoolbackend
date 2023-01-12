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
import { Salle } from 'src/entities/salle.entity';
import { NiveauEtudeService } from '../niveau_etude/niveau-etude.service';
import { SalleCreateInput } from './dto/salle.input';
import { SalleUpdateInput } from './dto/salle.update';

@Entity()
@ObjectType()
export class SalleService {
    constructor(
        @InjectRepository(Salle)
        private salleRepository: EntityRepository<Salle>,
        private niveauEtude: NiveauEtudeService,
        private  em: EntityManager,
      ) {}
    
      async create(
        input: SalleCreateInput,
      ): Promise<Salle> {        
        const salle = new Salle()

        const niveau = input.niveau
        ? await this.niveauEtude.findByOne({id:input.niveau.ID})
        : await this.niveauEtude.create(input.niveau)


        salle.name = input.name
        salle.description = input.description || null
        salle.effectif = input.effectif
        salle.niveau.id = niveau.id
        
        await this.salleRepository.persistAndFlush(Salle)
        return salle
      }
    
      findByOne(filters: FilterQuery<Salle>): Promise<Salle | null> {
        return this.salleRepository.findOne(filters);
      }
      findById(id:string){
        return this.salleRepository.findOne(+id)
      }
    
      getAll(): Promise<Salle[]> {
        return this.salleRepository.findAll()
      }
      
      async update(salle: Salle, input: SalleUpdateInput): Promise<Salle> {
        if (input.niveau) {
            const niveau =
            input.niveau?.ID &&
              (await this.niveauEtude.findByOne({ id: input.niveau?.ID }));
      
            if (!niveau) {
              throw new NotFoundError('niveau no exist' || '');
            }
            this.niveauEtude.update(niveau, input.niveau);
          } 
        wrap(salle).assign({
            name: input.name || salle.name,
            description: input.description || salle.description,
            effectif:input.effectif || salle.effectif,
        },
        { em: this.em },
        );
            await this.salleRepository.persistAndFlush(salle);
            return salle;
        }
        async deletePrime(){
            
      }  
      
      // Montant attendu par salle pension
      async MontantAttendu(id:number){
        const salle = this.salleRepository.findOneOrFail(id)
        const amount  = (await salle).fraisInscription.getEntity().montant
        return amount*(await salle).effectif
      }
       
      // Montant Inscription recu par salle inscription
      async inscriptionRecuSalle(id:number){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = await salle.fraisInscription.getEntity()
        let amount = 0
        const inscription = await fraisInscription.inscription.matching({})
        for(let i = 0 ; i < inscription.length; i++){
          amount += inscription[i].montant
        }
        const montantAttendu = await this.MontantAttendu(id)
        const rar = montantAttendu - amount
        let effectif = inscription.length
        return {
            "salle": salle,
            "amount": amount,
            "effectif":effectif,
            "montant attendu": montantAttendu,
            "RAR": rar,
            "TRAR": (rar/montantAttendu)*100
        }
      }
  // liste des eleve ayant tout payer leur inscription par sale
      async listeInscriptionComplet(id:number){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = salle.fraisInscription.getEntity()
        const liste = []
        const listeInscrit = await fraisInscription.inscription.matching({})
        for (let i = 0; i < listeInscrit.length; i++){
          if(listeInscrit[i].complete == true){
            liste.push(listeInscrit[i].student)
          }   
        }
        return liste
      }
    
    // liste des eleves incriptions incompletes
    async listeInscriptionIncomplet(id:number){
        const salle = await this.salleRepository.findOneOrFail(id)
        const fraisInscription = salle.fraisInscription.getEntity()
        const liste = []
        const listeInscrit = await fraisInscription.inscription.matching({})
        for (let i = 0; i < listeInscrit.length; i++){
          if(listeInscrit[i].complete == false){
            liste.push(listeInscrit[i].student)
          }   
      }
      return liste
    }
}
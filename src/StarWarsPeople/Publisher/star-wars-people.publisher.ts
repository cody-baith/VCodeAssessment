import { Injectable, OnModuleInit } from '@nestjs/common';
import { StarWarsClientModel } from '../Model/star-wars-client.model';
import { EventPublisher } from '@nestjs/cqrs';


@Injectable()
export class StarWarsPeoplePublisher implements OnModuleInit{

    private swcm: StarWarsClientModel;

    constructor(private readonly publisher: EventPublisher,){
    };

    onModuleInit() {
       const clientClass = this.publisher.mergeClassContext(StarWarsClientModel);
       this.swcm = new clientClass();
    }

    getClient(): StarWarsClientModel {
      return this.swcm;
    }
}
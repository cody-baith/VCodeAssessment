import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StarWarsPeopleConnectedEvent } from "../Impl/star-wars-people-connected.event";

@EventsHandler(StarWarsPeopleConnectedEvent)
export class StarWarsPeopleConnectedHandler implements IEventHandler<StarWarsPeopleConnectedEvent> {
    
    async handle(event: StarWarsPeopleConnectedEvent){ 
        console.log(event.connectionString);
    }
}
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StarWarsPeopleDisconnectedEvent } from "../Impl/star-wars-people-disconnected.event";

@EventsHandler(StarWarsPeopleDisconnectedEvent)
export class StarWarsPeopleDisconnectedHandler implements IEventHandler<StarWarsPeopleDisconnectedEvent> {
    
    async handle(event: StarWarsPeopleDisconnectedEvent){ 
        console.log(event.log);
        console.log(event.disconnectionReason);
    }
}
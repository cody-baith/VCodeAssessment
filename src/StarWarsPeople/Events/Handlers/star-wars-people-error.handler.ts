import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StarWarsPeopleErrorEvent } from "../Impl/star-wars-people-error.event";

@EventsHandler(StarWarsPeopleErrorEvent)
export class StarWarsPeopleErrorHandler implements IEventHandler<StarWarsPeopleErrorEvent> {
    
    async handle(event: StarWarsPeopleErrorEvent){ 
        console.log(event.log);
        console.log(event.error);
    }
}
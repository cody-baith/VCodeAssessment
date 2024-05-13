import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { StarWarsPeopleSearchOutputEvent } from "../Impl/star-wars-people-search-output.event";

@EventsHandler(StarWarsPeopleSearchOutputEvent)
export class StarWarsPeopleSearchOutputHandler implements IEventHandler<StarWarsPeopleSearchOutputEvent> {
    
    async handle(event: StarWarsPeopleSearchOutputEvent){ 
        if(event.page == -1) {
            console.log('ERR: ' + event.error);
        } else { 
            console.log('(' + event.page + '/' + event.resultCount + ') ' + event.name + ' - [' + event.films + ']');
        }
    }
}
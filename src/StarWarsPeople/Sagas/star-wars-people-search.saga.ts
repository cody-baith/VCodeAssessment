import { Injectable } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { StarWarsPeopleSearchOutputEvent } from "../Events/Impl/star-wars-people-search-output.event";
import { StarWarsPeopleConnectedEvent } from "../Events/Impl/star-wars-people-connected.event";
import { StarWarsPeopleSearchCommand } from "../Commands/impl/star-wars-people-search.command";

@Injectable()
export class StarWarsPeopleSearchSaga {

  @Saga()
  firstSearch = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(StarWarsPeopleConnectedEvent),
      delay(100),
      map((event) => { return new StarWarsPeopleSearchCommand() }),
    );
  }

  @Saga()
  startNewSearch = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(StarWarsPeopleSearchOutputEvent),
      delay(100),
      map((event) => {
        if(event.isLastEvent()){
          return new StarWarsPeopleSearchCommand()
        }
      }),
    );
  }


}
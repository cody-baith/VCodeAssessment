
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StarWarsPeopleSearchCommand } from '../impl/star-wars-people-search.command';
import { StarWarsPeoplePublisher } from 'src/StarWarsPeople/Publisher/star-wars-people.publisher';

@CommandHandler(StarWarsPeopleSearchCommand)
export class StarWarsPeopleSearchHandler implements ICommandHandler<StarWarsPeopleSearchCommand> {

  constructor( private readonly publisher: StarWarsPeoplePublisher,) {}

  async execute(command: StarWarsPeopleSearchCommand) {
  
    const starWarsClient = this.publisher.getClient();
    starWarsClient.startStarWarsPeopleSearch();

  }
}
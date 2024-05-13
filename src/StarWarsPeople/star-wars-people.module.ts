import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './Commands/Handlers';
import { EventHandlers } from './Events/Handlers';
import { Sagas } from './Sagas';
import { StarWarsPeoplePublisher } from './Publisher/star-wars-people.publisher';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...Sagas,
    StarWarsPeoplePublisher,
  ],
})
export class StarWarsPeopleModule {}
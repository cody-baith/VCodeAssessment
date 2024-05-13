import { Module } from '@nestjs/common';
import { StarWarsPeopleModule } from './StarWarsPeople/star-wars-people.module';

@Module({
  imports: [StarWarsPeopleModule]
})
export class AppModule {}

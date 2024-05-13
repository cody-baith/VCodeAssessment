import { StarWarsPeopleConnectedHandler } from "./star-wars-people-connected.handler";
import { StarWarsPeopleDisconnectedHandler } from "./star-wars-people-disconnected.handler";
import { StarWarsPeopleErrorHandler } from "./star-wars-people-error.handler";
import { StarWarsPeopleSearchOutputHandler } from "./star-wars-people-search-output.handler";

export const EventHandlers = [StarWarsPeopleConnectedHandler, StarWarsPeopleDisconnectedHandler, StarWarsPeopleErrorHandler, StarWarsPeopleSearchOutputHandler];
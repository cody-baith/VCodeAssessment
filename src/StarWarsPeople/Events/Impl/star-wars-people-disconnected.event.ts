export class StarWarsPeopleDisconnectedEvent {
    constructor(
        public readonly log: string,
        public readonly disconnectionReason: string,
    ){};
}
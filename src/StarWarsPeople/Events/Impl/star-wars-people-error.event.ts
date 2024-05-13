export class StarWarsPeopleErrorEvent {
    constructor(
        public readonly log: string,
        public readonly error: string,
    ){};
}
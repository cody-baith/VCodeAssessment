export class StarWarsPeopleSearchOutputEvent {
    constructor(
        public readonly page: number,
        public readonly resultCount: number, 
        public readonly name: string,
        public readonly films: string,
        public readonly error: string
    ){};

    public isLastEvent(): boolean {
        return this.page == this.resultCount;
    }
}
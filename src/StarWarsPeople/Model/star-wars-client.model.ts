import { AggregateRoot } from '@nestjs/cqrs';
import { io, Socket } from 'socket.io-client';
import { StarWarsPeopleSearchOutputEvent } from '../Events/Impl/star-wars-people-search-output.event';
import { StarWarsPeopleConnectedEvent } from '../Events/Impl/star-wars-people-connected.event';
import { StarWarsPeopleDisconnectedEvent } from '../Events/Impl/star-wars-people-disconnected.event';
import { StarWarsPeopleErrorEvent } from '../Events/Impl/star-wars-people-error.event';

export class StarWarsClientModel extends AggregateRoot {

    private connection: string = 'http://localhost:3000';
    private starWarsSocket: Socket;

    constructor() {
        super();
        this.starWarsSocket = io(this.connection);
        this.registerDisconnectEvent();
        this.registerErrorEvent();
        this.registerSearchEvent();
        this.registerConnectEvent();
    }

    registerConnectEvent() {
        this.starWarsSocket.on('connect', () => {
            this.apply(new StarWarsPeopleConnectedEvent('--Connected to ' + this.connection + '--'));
            this.commit();
        });
    }

    registerDisconnectEvent() {
        this.starWarsSocket.on('disconnect', (reason) => {
            if (this.starWarsSocket.active) {

            } else {
                this.apply(new StarWarsPeopleDisconnectedEvent('--Disconnected from ' + this.connection + '--', reason));
                this.commit();
            }
        });
    }

    registerErrorEvent() {
        this.starWarsSocket.on('error', (error) => {
            this.apply(new StarWarsPeopleErrorEvent('--Error received from ' + this.connection + '--', error));
            this.commit();
        });
    }

    registerSearchEvent() {
        this.starWarsSocket.on('search', (result) => {
            this.apply(new StarWarsPeopleSearchOutputEvent(
                result.page,
                result.resultCount,
                result.name,
                result.films,
                result.error
            ));
            this.commit();
        });
    }

    public async startStarWarsPeopleSearch() {

        const queryString: string = await this.askQuestion();
        const cleanQueryString = queryString.replaceAll(';', '');
        this.emitSearchEvent(queryString);

    }

    private askQuestion(): Promise<string> {

        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise(resolve => rl.question('What character would you like to search for? ', ans => {
            rl.close();
            resolve(ans);
        }));
    }

    private emitSearchEvent(queryString: string) {

        if(this.starWarsSocket.connected){
            console.log('Searching for ' + queryString + '...');
            this.starWarsSocket.emit('search', { query: queryString });
        } else {
            this.apply(new StarWarsPeopleDisconnectedEvent('--Disconnected from ' + this.connection + '--\n--Close application or wait for reconnect--', ''));
            this.commit();
        }

    }
}

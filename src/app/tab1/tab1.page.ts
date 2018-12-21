import {Component} from '@angular/core';
import gql from 'graphql-tag';
import {VoyagerClient, createClient} from '@aerogear/datasync-js';

const HELLO = gql`
    query hello {
        hello
    }
`;

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    async voyager() {
        console.log('voyager');

        const apollo: VoyagerClient = await this.createApolloClient();

        try {
            const foo = await apollo.query<any>({
                query: HELLO,
                fetchPolicy: 'network-only',
                errorPolicy: 'none'
            });

            console.log('success xx');
            console.log(foo);
        } catch (e) {
            console.log('error xx');
            console.log(e);
        }
    }

    public async createApolloClient() {
        const self = this;
        // const uri = 'http://localhost:4000/graphql';
        const uri = 'http://192.168.1.111:4000/graphql';
        // const wsUri = 'ws://localhost:4000/graphql';
        return await createClient({
            httpUrl: uri,
            auditLogging: true
            // wsUrl: wsUri
        });
    }
}

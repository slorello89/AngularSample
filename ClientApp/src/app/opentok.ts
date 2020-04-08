import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import * as Promise from 'bluebird';
import config from '../config';

@Injectable({ providedIn:'root' })
export class OpentokService {
    session: OT.Session;
    token: string;
    const() { }

    getOT() {
        return OT;
    }

    initSession() {
        return fetch(config.SAMPLE_SERVER_BASE_URL + '/session/GetSession')
            .then((data) => data.json()).then((json) => {
                this.session = this.getOT().initSession(json.apiKey, json.sessionId);
                this.token = json.token;
                return this.session;
            });        
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.session.connect(this.token, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.session);
                }
            })
        })
    }
}

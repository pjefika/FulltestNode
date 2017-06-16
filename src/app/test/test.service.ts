import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Valids } from './../viewmodel/validacao';
import { Cadastro } from './../viewmodel/cadastro';

@Injectable()
export class TestService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private FulltestUrl = '10.40.195.81:8080/fulltestAPI/fulltest/';  // URL to web api

    constructor(private http: Http) { }

    getValidacao(cadastro: Cadastro): Promise<Valids[]> {
        const url = `${this.FulltestUrl}` + "fulltest/";
        return this.http.post(url, JSON.stringify(cadastro), this.options)
            .toPromise()
            .then(response => {
                return response.json() as Valids[]
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
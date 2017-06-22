import { ObjectValid } from './../viewmodel/objectValid';
import { Valids } from './../viewmodel/validacao';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cadastro } from '../viewmodel/cadastro';

@Injectable()
export class CadastroService {

    private headers = new Headers({ 'Content-Type': 'text/plain' });    
    private stealerAPIUrl = 'http://10.40.195.81:8080/stealerAPI/oss/';  // URL to stealerAPI
    
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private fulltestUrl = 'http://10.40.195.81:8080/fulltestAPI/fulltest/';  // URL to FulltestAPI

    constructor(private http: Http) { }    

    getCadastro(instancia: string): Promise<Cadastro> {
        const url = `${this.stealerAPIUrl}${instancia}`;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
               return response.json() as Cadastro
            })
            .catch(this.handleError);
    }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        const url = `${this.fulltestUrl}` + "fulltest/";
        return this.http.post(url, JSON.stringify(cadastro), this.options)
            .toPromise()
            .then(response => {
                return response.json() as ObjectValid
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
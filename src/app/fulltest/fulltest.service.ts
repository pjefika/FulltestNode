import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FulltestService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private fulltestUrl = 'http://10.40.195.81:8080/fulltestAPI/fulltest/';  // URL to FulltestAPI

    constructor(private http: Http) { } 

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        const url = `${this.fulltestUrl}` + "fulltest/";
        //console.log(url);
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
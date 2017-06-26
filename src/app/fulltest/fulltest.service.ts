import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

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
            .timeout(60000)
            .toPromise()
            .then(response => {
                return response.json() as ObjectValid
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        var er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            var erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}
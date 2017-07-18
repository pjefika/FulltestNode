import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ResetService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private Url = '';  // URL to ...

    constructor(private http: Http) { }

    reset(cadastro: Cadastro): Promise<Boolean> {
        const url = `${this.Url}` + "restodolink/";
        return this.http.post(url, JSON.stringify(cadastro), this.options)
            .timeout(100000)
            .toPromise()
            .then(response => {
                return true;
            })
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}
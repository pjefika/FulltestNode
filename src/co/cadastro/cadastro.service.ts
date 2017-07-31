import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class CadastroService {

    private headers = new Headers({ 'Content-Type': 'text/plain' });
    private stealerAPIUrl = 'http://10.40.195.81:8080/stealerAPI/oss/';  // URL to stealerAPI

    // private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    // private options = new RequestOptions({ headers: this.headersAppJson });
    // private fulltestUrl = 'http://10.40.195.81:8080/fulltestAPI/fulltest/';  // URL to FulltestAPI

    constructor(private http: Http) { }

    getCadastro(instancia: string): Promise<Cadastro> {
        const url = `${this.stealerAPIUrl}${instancia}`;
        return this.http.get(url, { headers: this.headers })
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as Cadastro
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
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}
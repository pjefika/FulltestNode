import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cadastro } from '../viewmodel/cadastro';

@Injectable()
export class CadastroService {

    private headers = new Headers({ 'Content-Type': 'text/plain' });
    private stealerAPIUrl = 'http://10.40.195.81:8080/stealerAPI/oss/';  // URL to web api

    constructor(private http: Http) { }    

    getCadastro(instancia: string): Promise<Cadastro> {
        const url = `${this.stealerAPIUrl}${instancia}`;
        //console.log(url);
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
               return response.json() as Cadastro
            })
            .catch(this.handleError);

        //return this.cadastro;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
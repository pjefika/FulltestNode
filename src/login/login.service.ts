import { Usuario } from './../viewmodel/usuario';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/Rx';

@Injectable()
export class LoginService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private efikaWSUrl = 'http://10.200.35.67:80/efikaAuth/autentica/';  // URL to web api

    constructor(private http: Http) { }

    autentica(usuario: Usuario): Promise<Boolean> {
        const url = `${this.efikaWSUrl}` + "verificarCredencial";
        return this.http.post(url, JSON.stringify(usuario), this.options)
            .timeout(9000)
            .toPromise()
            .then(response => {
                return response.json() as Boolean
            })
            .catch(this.handleError);
    }

    getUsuario(usuario: Usuario): Promise<Usuario> {
        const url = `${this.efikaWSUrl}` + "consultar/" + usuario.login;
        return this.http.get(url, this.options)
            .timeout(10000)
            .toPromise()
            .then(response => {
                return response.json() as Usuario
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
import { UrlService } from './../util/url-service/url.service';
import { Usuario } from './../viewmodel/usuario';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/Rx';

@Injectable()
export class LoginService {

    constructor(
        private urlService: UrlService) { }

    autentica(usuario: Usuario): Promise<Boolean> {
        return this.urlService.request("post", "efikaAuth/autentica/verificarCredencial", usuario)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    getUsuario(usuario: Usuario): Promise<Usuario> {
        return this.urlService.request("get", "efikaAuth/autentica/consultar/", usuario.login)
            .then(data => {
                return data as Usuario
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
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
        return this.urlService.request("post", this.urlService.pathAuth + "autentica/verificarCredencial", usuario, "10.40.195.81:8080/")
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    getUsuario(usuario: Usuario): Promise<Usuario> {
        return this.urlService.request("get", this.urlService.pathAuth + "autentica/consultar/", usuario.login, "10.40.195.81:8080/")
            .then(data => {
                return data as Usuario
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
import { InfoRequest } from './../viewmodel/url/infos-url';
import { UrlService } from './../util/url-service/url.service';
import { Usuario } from './../viewmodel/usuario';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/Rx';

@Injectable()
export class LoginService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public autentica(usuario: Usuario): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathAuth + "autentica/verificarCredencial",
            otherUrl: "10.40.195.81:8080/",
            _data: usuario
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    public getUsuario(usuario: Usuario): Promise<Usuario> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathAuth + "autentica/consultar/",
            otherUrl: "10.40.195.81:8080/",
            _data: usuario.login
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Usuario
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
import { UrlService } from './../util/url-service/url.service';
import { Usuario } from './../viewmodel/usuario';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public autentica(usuario: Usuario): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathAuth + "autentica/verificarCredencial",
            _data: usuario,
            timeout: 6000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Boolean

            })
            .catch(super.handleError);
    }

    public getUsuario(usuario: Usuario): Promise<Usuario> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathAuth + "autentica/consultar/",
            _data: usuario.login,
            timeout: 6000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Usuario
            })
            .catch(super.handleError);
    }
}
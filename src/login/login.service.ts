import { Injectable } from '@angular/core';
import { SuperService } from '../util/superservice/super.service';
import { Usuario } from '../viewmodel/usuario/usuario';
import { UrlService } from '../util/urlservice/url.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(private urlService: UrlService) { super(); }

    public autentica(usuario: Usuario): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathAuth + "autentica/verificarCredencial",
            _data: usuario,
            otherUrl: "http://10.40.195.81:8080/",
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
            otherUrl: "http://10.40.195.81:8080/",
            timeout: 6000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Usuario
            })
            .catch(super.handleError);
    }

    public getUsuarioMock(): Usuario {
        return JSON.parse('{"login":"G0034481","nivel":10}');
    }

}
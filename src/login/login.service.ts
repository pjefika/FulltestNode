import { Injectable } from '@angular/core';
import { SuperService } from '../util/superservice/super.service';
import { Usuario } from '../viewmodel/usuario/usuario';
import { Http } from '@angular/http';
import { LinkService } from '../util/urlservice/link.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public autentica(usuario: Usuario): Promise<Boolean> {
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "authAPI", "autentica/verificarCredencial"),
            _data: usuario,
            timeout: 5000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Boolean;
            })
            .catch(super.handleErrorKing);
    }

    public getUsuario(usuario: Usuario): Promise<Usuario> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "authAPI", "autentica/consultar/"),
            _data: usuario.login,
            timeout: 5000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Usuario;
            })
            .catch(super.handleErrorKing);
    }

    public getUsuarioMock(): Usuario {
        return JSON.parse('{"login":"G0034481","nivel":10}');
    }

}
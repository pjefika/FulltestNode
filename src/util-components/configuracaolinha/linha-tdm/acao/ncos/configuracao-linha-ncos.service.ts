import { Injectable } from '@angular/core';
import { SuperService } from '../../../../../util/superservice/super.service';
import { Ncos } from '../../../../../viewmodel/linha/ncos';
import { Linha } from '../../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../../../viewmodel/linha/cadlinha';
import { Http } from '@angular/http';
import { LinkService } from '../../../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoLinhaNcosService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getNcos(): Promise<Ncos[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/ncos"),
            // _data: _data,
            timeout: 5000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Ncos[];
            })
            .catch(super.handleError);
    }

    public setNcos(linha: Linha, ncos: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, ncos: string, executor: string };
        _data = { dms: dms, ncos: ncos, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/editarNcos"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
            })
            .catch(super.handleError);
    }

}
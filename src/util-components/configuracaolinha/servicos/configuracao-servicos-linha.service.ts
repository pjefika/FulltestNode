import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { ServicoLinha } from '../../../viewmodel/linha/servicolinha';
import { Customer } from '../../../viewmodel/customer/customer';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoServicosLinhaService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getServicos(): Promise<ServicoLinha[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/servicos"),
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as ServicoLinha[];
            })
            .catch(super.handleError);
    }

    public setEditarServicos(cad: Customer, services: string[]): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: cad.linha.dn, central: cad.linha.central }
        let _data: { instancia: string, dms: any, services: string[], executor: string };
        _data = { instancia: cad.instancia, dms: dms, services: services, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/editarServicos"),
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
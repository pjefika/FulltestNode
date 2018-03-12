import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { ServicoLinha } from '../../../viewmodel/linha/servicolinha';
import { Customer } from '../../../viewmodel/customer/customer';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracaoServicosLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super()
    }

    public getServicos(): Promise<ServicoLinha[]> {
        this.infoResquest = {
            rqst: "get",
            path: "dms/servicos",
            command: "dmsAPI",
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ServicoLinha[];
            })
            .catch(super.handleError);
    }

    public setEditarServicos(cad: Customer, services: string[]): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: cad.linha.dn, central: cad.linha.central }
        let _data: { instancia: string, dms: any, services: string[], executor: string };
        _data = { instancia: cad.instancia, dms: dms, services: services, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "dms/editarServicos",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(super.handleError);
    }
}
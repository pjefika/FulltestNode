import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { Len } from '../../../viewmodel/linha/len';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Customer } from '../../../viewmodel/customer/customer';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoManobraLinhaService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setManobrarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: any, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/manobrarLinha"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
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
import { Injectable } from '@angular/core';
import { SuperService } from '../../../../../util/superservice/super.service';
import { Linha } from '../../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../../../viewmodel/linha/cadlinha';
import { Http } from '@angular/http';
import { LinkService } from '../../../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoLinhaCustgroupService extends SuperService {

    constructor(public http: Http) {
        super(http,);
    }

    public setCustGroup(linha: Linha, custgroup: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, custGrp: string, executor: string };
        _data = { dms: dms, custGrp: custgroup, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/editarCustGrp"),
            _data: _data,
            timeout: 20000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
            })
            .catch(super.handleError);
    }

}
import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CustgroupService {

    constructor(
        private urlService: UrlService) { }

    public setCustGroup(linha: Linha, custgroup: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, custGrp: string, executor: string };
        _data = { dms: dms, custGrp: custgroup, executor: usr.user };
        return this.urlService.request("post", this.urlService.pathDmsAPI + "dms/editarCustGrp", _data)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
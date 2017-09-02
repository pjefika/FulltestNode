import { CadastroLinha } from './../../viewmodel/cadastro-linha/cadastro-linha';
import { UrlService } from './../../util/url-service/url.service';
import { Linha } from './../../viewmodel/cadastro/linha';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracaoLinhaService {

    constructor(
        private urlService: UrlService) { }

    public getInformacoes(linha: Linha) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        return this.urlService.request("post", this.urlService.pathDmsAPI + "dms/consultar", _data)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
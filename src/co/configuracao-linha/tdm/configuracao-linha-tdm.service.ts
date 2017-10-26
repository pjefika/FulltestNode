import { CadastroLinha } from './../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../util/url-service/url.service';
import { InfoRequest } from './../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracaoLinhaTdmService {
    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getInformacoes(linha: Linha) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/consultar",
            _data: _data,
            timeout: 50000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
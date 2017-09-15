import { CadastroLinha } from './../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../util/url-service/url.service';
import { InfoRequest } from './../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class LinhaResetDePortaService {
    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public resetarPorta(linha: Linha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/resetarPorta",
            _data: _data,
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
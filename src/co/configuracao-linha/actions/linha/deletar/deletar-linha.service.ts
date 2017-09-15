import { InfoRequest } from './../../../../../viewmodel/url/infos-url';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { UrlService } from './../../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DeletarLinhaService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public setDeletarLinha(linha: Linha, cadastroLinha: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, executor: string };
        _data = { dms: dms, len: cadastroLinha.len, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/deletarLinha",
            _data: _data,
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
import { InfoRequest } from './../../../../../viewmodel/url/infos-url';
import { Len } from './../../../../../viewmodel/cadastro-linha/len';
import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CriarLinhaService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public setCriarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: CadastroLinha, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/criarLinha",
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
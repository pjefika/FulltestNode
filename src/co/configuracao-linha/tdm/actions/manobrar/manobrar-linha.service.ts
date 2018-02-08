import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Len } from './../../../../../viewmodel/cadastro-linha/len';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ManobraLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setManobrarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: any, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/manobrarLinha",
            _data: _data,
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }

}
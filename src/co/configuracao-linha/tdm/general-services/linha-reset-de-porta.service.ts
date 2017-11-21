import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../util/url-service/url.service';
import { InfoRequest } from './../../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class LinhaResetDePortaService extends SuperService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) {
        super();
    }

    public resetarPorta(linha: Linha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/resetarPorta",
            _data: _data,
            timeout: 200000
        }
        console.log(this.infoResquest)
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }
}
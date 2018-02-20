import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracaoLinhaTdmService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

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
            .catch(super.handleError);
    }

}
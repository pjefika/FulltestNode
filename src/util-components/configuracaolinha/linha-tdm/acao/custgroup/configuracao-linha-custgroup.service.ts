import { Injectable } from '@angular/core';
import { SuperService } from '../../../../../util/superservice/super.service';
import { UrlService } from '../../../../../util/urlservice/url.service';
import { Linha } from '../../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracaoLinhaCustgroupService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setCustGroup(linha: Linha, custgroup: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, custGrp: string, executor: string };
        _data = { dms: dms, custGrp: custgroup, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/editarCustGrp",
            _data: _data,
            path: "NotImplemented",
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }

}
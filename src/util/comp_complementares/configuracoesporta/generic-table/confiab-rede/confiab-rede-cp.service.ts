import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { ResultNormal } from 'viewmodel/confPorta/viewhold/resultNormal';
import { EstadoPorta } from 'viewmodel/confPorta/estadoPorta';

@Injectable()
export class ConfiabilidadeRedeCpService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setAdminState(cadastro: Cadastro, estadoPorta: ResultNormal) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, estadoPorta: ResultNormal };
        _data = { cust: cadastro, executor: usr.user, estadoPorta: estadoPorta };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/setAdminState",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as EstadoPorta
            })
            .catch(super.handleError);
    }


}
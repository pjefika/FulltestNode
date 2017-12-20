import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { ResultNormal } from 'viewmodel/confPorta/viewhold/resultNormal';
import { EstadoPorta } from 'viewmodel/confPorta/estadoPorta';
import { ConfiabilidadeRede } from 'viewmodel/confPorta/ConfiabilidadeRede';

@Injectable()
export class ConfiabilidadeRedeCpService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public consultar(cadastro: Cadastro) {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { cust: any, executor: string};
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/getConfiabilidadeRede",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ConfiabilidadeRede
            })
            .catch(super.handleError);
    }


}
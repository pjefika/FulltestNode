import { Rede } from './../../viewmodel/cadastro/rede';
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCadastro(instancia: string): Promise<Cadastro> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 63000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }

    public getCadastroDOne(instancia: string): Promise<Cadastro> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathNetworkInventory + "networkInventory/",
            _data: instancia,
            timeout: 10000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }

}
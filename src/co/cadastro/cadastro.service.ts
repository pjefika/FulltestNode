import { Rede } from './../../viewmodel/cadastro/rede';
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class CadastroService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getCadastro(instancia: string): Promise<Cadastro> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 60000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(this.handleError);
    }

    public getCadastroDOne(instancia: string) {
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
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
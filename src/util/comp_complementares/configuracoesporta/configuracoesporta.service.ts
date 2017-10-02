import { ConfPorta } from './../../../viewmodel/confPorta/confPorta';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../url-service/url.service';
import { InfoRequest } from './../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracoesPortaService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }


    public getConfigPorta(cadastro: Cadastro): Promise<ConfPorta> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ConfPorta
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
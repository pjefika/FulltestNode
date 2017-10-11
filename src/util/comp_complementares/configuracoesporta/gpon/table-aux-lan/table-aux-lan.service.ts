import { VlanBanda } from './../../../../../viewmodel/confPorta/vlanBanda';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../../../url-service/url.service';
import { InfoRequest } from './../../../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class TableAuxLanService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public setVlanGeneric(cadastro: Cadastro, whatSet: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/" + whatSet,
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as VlanBanda
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Injectable } from '@angular/core';

@Injectable()
export class FulltestCrmService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/crm/", // crm -- corrective
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ObjectValid
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
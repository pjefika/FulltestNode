import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class FulltestService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/fulltest/",
            _data: cadastro,
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
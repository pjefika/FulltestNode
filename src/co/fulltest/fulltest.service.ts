import { UrlService } from './../../util/url-service/url.service';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class FulltestService {

    constructor(
        private urlService: UrlService) { }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        return this.urlService.request("post", this.urlService.pathFulltestAPI + "fulltest/corrective/", cadastro)
            .then(data => {
                return data as ObjectValid
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
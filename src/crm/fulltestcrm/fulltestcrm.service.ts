import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Injectable } from '@angular/core';

@Injectable()
export class FulltestCrmService {

    constructor(
        private urlService: UrlService) { }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {

        return this.urlService.request("post", "fulltestAPI/fulltest/corrective/", cadastro)
            .then(data => {
                return data as ObjectValid
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
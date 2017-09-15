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

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/corrective/",
            _data: cadastro
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
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class CadastroCrmService {
    
    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    getCadastro(instancia: string): Promise<Cadastro> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: instancia,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 60000
        }
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
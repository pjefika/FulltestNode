import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class CadastroCrmService {

    constructor(
        private urlService: UrlService) { }

    getCadastro(instancia: string): Promise<Cadastro> {
        return this.urlService.request("get", this.urlService.pathStealerAPI + "oss/", instancia)
            .then(response => {
                return response as Cadastro
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
import { Linha } from './../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ListarLinhaService {

    constructor(
        private urlService: UrlService) { }

    public getLinha(instancia: string) {
        return this.urlService.request("get", this.urlService.pathStealerAPI + "linha/", instancia)
            .then(data => {
                return data as Linha;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
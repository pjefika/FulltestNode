import { Ncos } from './../../../../viewmodel/cadastro-linha/ncos';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NcosService {

    constructor(
        private urlService: UrlService) { }

    public getNcos(): Promise<Ncos[]> {
        return this.urlService.request("get", this.urlService.pathDmsAPI + "dms/ncos")
            .then(data => {
                return data as Ncos[];
            })
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
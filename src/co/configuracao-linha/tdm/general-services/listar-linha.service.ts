import { Linha } from './../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../util/url-service/url.service';
import { InfoRequest } from './../../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class ListarLinhaService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getLinha(instancia: string) {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathStealerAPI + "linha/",
            _data: instancia,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 60000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Linha;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
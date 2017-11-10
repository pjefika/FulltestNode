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
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "linha/",
            _data: _data,
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
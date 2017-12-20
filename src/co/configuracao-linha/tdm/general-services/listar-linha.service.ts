import { Linha } from './../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ListarLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getLinha(instancia: string) {
        let usr = JSON.parse(localStorage.getItem('user'));
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
            .catch(super.handleError);
    }

}
import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Result } from '../../../../viewmodel/valid/result';
import { UrlService } from '../../../../util/urlservice/url.service';
import { AutenticacaoBanda } from '../../../../viewmodel/fulltest/autenticacaobanda/autenticacaobanda';

@Injectable()
export class FulltestAutenticacaoBandaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public consultarAutenticacao(result: Result): Promise<AutenticacaoBanda> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { macOrIp: string, executor: string };
        _data = { macOrIp: result.mac, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "stealerAPI/",
            command: "oss/auth/",
            _data: _data,
            timeout: 120000
        }
        // this.infoResquest = {
        //     rqst: "post",
        //     command: this.urlService.pathStealerAPI + "oss/auth/",
        //     path: "NotImplemented",
        //     otherUrl: this.urlService.otherUrlMake(),
        //     _data: _data,
        //     timeout: 120000
        // }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as AutenticacaoBanda
            })
            .catch(super.handleError);
    }
}
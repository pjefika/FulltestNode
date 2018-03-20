import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Result } from '../../../../viewmodel/valid/result';
import { AutenticacaoBanda } from '../../../../viewmodel/fulltest/autenticacaobanda/autenticacaobanda';
import { Http } from '@angular/http';
import { LinkService } from '../../../../util/urlservice/link.service';

@Injectable()
export class FulltestAutenticacaoBandaService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public consultarAutenticacao(result: Result): Promise<AutenticacaoBanda> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { macOrIp: string, executor: string };
        _data = { macOrIp: result.mac, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "stealerAPI", "oss/auth/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as AutenticacaoBanda;
            })
            .catch(super.handleError);
    }
}
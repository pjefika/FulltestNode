import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Customer } from '../../../viewmodel/customer/customer';
import { Valid } from '../../../viewmodel/valid/valid';
import { Result } from '../../../viewmodel/valid/result';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoEstadoPortaService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setAdminState(cadastro: Customer, estadoPorta: Result) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, estadoPorta: Result };
        _data = { cust: cadastro, executor: usr.user, estadoPorta: estadoPorta };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "configPorta/setAdminState/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Valid;
            })
            .catch(super.handleError);
    }

}
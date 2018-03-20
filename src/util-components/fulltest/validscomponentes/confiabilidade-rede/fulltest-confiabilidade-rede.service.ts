import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { Valid } from '../../../../viewmodel/valid/valid';
import { Http } from '@angular/http';
import { LinkService } from '../../../../util/urlservice/link.service';

@Injectable()
export class FulltestConfiabilidadeRedeService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public consultarConfRede(cadastro: Customer): Promise<Valid> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "configPorta/getConfiabilidadeRede/"),
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
import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { UrlService } from '../../../../util/urlservice/url.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { Valid } from '../../../../viewmodel/valid/valid';

@Injectable()
export class FulltestConfiabilidadeRedeService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public consultarConfRede(cadastro: Customer): Promise<Valid> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "configPorta/getConfiabilidadeRede",
            command: "fulltestAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Valid
            })
            .catch(super.handleError);
    }


}
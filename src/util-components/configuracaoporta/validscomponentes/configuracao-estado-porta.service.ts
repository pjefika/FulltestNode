import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { Customer } from '../../../viewmodel/customer/customer';
import { Valid } from '../../../viewmodel/valid/valid';
import { Result } from '../../../viewmodel/valid/result';

@Injectable()
export class ConfiguracaoEstadoPortaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setAdminState(cadastro: Customer, estadoPorta: Result) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, estadoPorta: Result };
        _data = { cust: cadastro, executor: usr.user, estadoPorta: estadoPorta };
        this.infoResquest = {
            rqst: "post",
            path: "fulltestAPI/",
            command: "configPorta/setAdminState",
            _data: _data,
            timeout: 120000
        }
        // this.infoResquest = {
        //     rqst: "post",
        //     path: "NotImplemented",
        //     command: this.urlService.pathFulltestAPI + "configPorta/setAdminState",
        //     _data: _data,
        //     otherUrl: this.urlService.otherUrlMake(true),
        //     timeout: 120000
        // }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Valid
            })
            .catch(super.handleError);
    }

}
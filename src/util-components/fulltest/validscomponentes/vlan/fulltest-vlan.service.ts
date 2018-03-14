import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { UrlService } from '../../../../util/urlservice/url.service';
import { Valid } from '../../../../viewmodel/valid/valid';

@Injectable()
export class FulltestVlanService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setVlanGeneric(cadastro: Customer, whatSet: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "fulltestAPI",
            command: "configPorta/" + whatSet,
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Valid
            })
            .catch(super.handleError);
    }

    public resetIptvStatistics(cadastro: Customer) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "fulltestAPI",
            command: "configPorta/resetIptvStatistics",
            _data: _data,
            timeout: 120000
        };
        // this.infoResquest = {
        //     rqst: "post",
        //     command: this.urlService.pathFulltestAPI + "configPorta/resetIptvStatistics",
        //     path: "NotImplemented",
        //     _data: _data,
        //     otherUrl: this.urlService.otherUrlMake(true),
        //     timeout: 120000
        // }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as any[]
            })
            .catch(super.handleError);
    }

}
import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { UrlService } from '../../../../util/urlservice/url.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { ResultSerial } from '../../../../viewmodel/serialontolt/resultserial';
import { ReturnResultSerial } from '../../../../viewmodel/serialontolt/returnresultserial';
import { Valid } from '../../../../viewmodel/valid/valid';

@Injectable()
export class FulltestSerialOntOltService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setOntToOlt(cadastro: Customer, serial: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, serial: { serial: string } };
        _data = { cust: cadastro, executor: usr.user, serial: { serial: serial } };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/setOntToOlt",
            path: "NotImplemented",
            _data: _data,
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ResultSerial
            })
            .catch(super.handleError);
    }

    public unsetOntFromOlt(cadastro: Customer) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/unsetOntFromOlt",
            path: "NotImplemented",
            _data: _data,
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ReturnResultSerial[]
            })
            .catch(super.handleError);
    }

}
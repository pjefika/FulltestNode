import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { ResultSerial } from '../../../../viewmodel/serialontolt/resultserial';
import { ReturnResultSerial } from '../../../../viewmodel/serialontolt/returnresultserial';
import { Valid } from '../../../../viewmodel/valid/valid';
import { Http } from '@angular/http';
import { LinkService } from '../../../../util/urlservice/link.service';

@Injectable()
export class FulltestSerialOntOltService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setOntToOlt(cadastro: Customer, serial: string, type: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, serial: { serial: string } };
        _data = { cust: cadastro, executor: usr.user, serial: { serial: serial } };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "configPorta/setOntToOlt/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as ResultSerial;
            })
            .catch(super.handleErrorKing);
    }

    public unsetOntFromOlt(cadastro: Customer) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "configPorta/unsetOntFromOlt/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as ReturnResultSerial[];
            })
            .catch(super.handleErrorKing);
    }

}
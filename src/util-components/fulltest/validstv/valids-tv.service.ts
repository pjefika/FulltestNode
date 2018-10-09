import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Http } from '@angular/http';
import { Certification } from '../../../viewmodel/fulltest/certification';
import { FulltestTV } from '../../../viewmodel/fulltest-tv/fulltest-tv';
import { Customer } from '../../../viewmodel/customer/customer';

declare var require: any

@Injectable()
export class ValidsTVService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setcertificationbyid(customer: Customer, id: string): Promise<Certification> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { parameter: string, customer: Customer, executor: string };
        _data = { parameter: id, customer: customer, executor: usr.user };
        // 7179 a porta
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "customerAPI", "customer/findByParameterTv/"),
            // url: this.urlespected,
            _data: _data,
            timeout: 600000,
        }
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Certification;
            })
            .catch(super.handleErrorKing);
    }

    public setcertificationbyidMock(): Promise<Certification> {
        let c: Certification = require('../../../assets/mocks/certificationtv/certificationtv.json');
        return Promise.resolve(c);
    }

}
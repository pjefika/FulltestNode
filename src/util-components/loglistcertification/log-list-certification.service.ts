import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { Certification } from '../../viewmodel/fulltest/certification';
import { Http } from '@angular/http';

declare var require: any

@Injectable()
export class LogListCertificationService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getCertificationByCustomer(instancia: string): Promise<Certification[]> {
        let _data: { instancia: string };
        _data = { instancia: instancia };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "customerAPI", "certification/findByCustomer/"),
            _data: _data,
            timeout: 35000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Certification[];
            })
            .catch(super.handleErrorKing);
    }

    public getCertificationByCustomerMock(): Certification[] {
        let list: Certification[];
        list = require('../../assets/mocks/loglistmanobra/manobra.json'); //Mock Produção
        return list;
    }

}
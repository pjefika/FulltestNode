import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { Http } from '@angular/http';
import { Customer } from '../../viewmodel/customer/customer';
import { ListManobraCertification } from '../../viewmodel/manobrar/listmanobra';

declare var require: any

@Injectable()
export class LogListManobraService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public findManobraByCustomer(customer: Customer): Promise<ListManobraCertification[]> {
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "customerAPI", "certification/findManobraByCustomer/"),
            _data: customer,
            timeout: 35000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as ListManobraCertification[];
            })
            .catch(super.handleErrorKing);
    }

    public findManobraByCustomerMock(): ListManobraCertification[] {
        let list: ListManobraCertification[];
        list = require('../../assets/mocks/loglistmanobra/manobra.json'); //Mock Produção
        return list;
    }

}
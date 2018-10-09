import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { Http } from '@angular/http';
import { Customer } from '../../viewmodel/customer/customer';
import { ListManobraCertification } from '../../viewmodel/manobrar/listmanobra';

@Injectable()
export class LogListManobraService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public findManobraByCustomer(customer: Customer): Promise<ListManobraCertification[]> {
        // let _data: { customer: Customer };
        // _data = { customer: customer };
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

}
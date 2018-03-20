import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { Result } from '../../../../viewmodel/valid/result';
import { Http } from '@angular/http';
import { LinkService } from '../../../../util/urlservice/link.service';

@Injectable()
export class FulltestProfileService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setProfile(cadastro: Customer, result: Result): Promise<Result> {
        // result.up = null;
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, profile: Result };
        _data = { cust: cadastro, executor: usr.user, profile: result };

        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "configPorta/setProfile/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta.atual.result as Result;
            })
            .catch(super.handleError);
    }

    public setProfileMock(): Result {
        return JSON.parse('{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}') as Result;
    }

}
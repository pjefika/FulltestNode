import { Injectable } from '@angular/core';
import { SuperService } from '../../../../util/superservice/super.service';
import { UrlService } from '../../../../util/urlservice/url.service';
import { Customer } from '../../../../viewmodel/customer/customer';
import { Result } from '../../../../viewmodel/valid/result';

@Injectable()
export class FulltestProfileService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setProfile(cadastro: Customer, result: Result): Promise<Result> {
        // result.up = null;
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, profile: Result };
        _data = { cust: cadastro, executor: usr.user, profile: result };
        this.infoResquest = {
            rqst: "post",
            path: "configPorta/setProfile",
            command: "fulltestAPI",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta.atual.result as Result;
            })
            .catch(this.handleError);
    }

    public setProfileMock(): Result {
        return JSON.parse('{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}') as Result;
    }

}
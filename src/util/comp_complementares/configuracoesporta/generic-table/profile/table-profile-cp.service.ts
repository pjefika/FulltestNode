import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { ResultProfile } from 'viewmodel/confPorta/viewhold/resultProfile';

@Injectable()
export class TableProfileCpService extends SuperService {

    constructor(private urlService: UrlService) { super(); }

    public setProfile(cadastro: Cadastro, resultProfile: ResultProfile) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, profile: ResultProfile };
        _data = { cust: cadastro, executor: usr.user, profile: resultProfile };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/setProfile",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ResultProfile
            })
            .catch(this.handleError);
    }

}
import { ResultProfile } from './../../../../../viewmodel/confPorta/viewhold/resultProfile';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../../../url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class TableAuxProfileService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

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
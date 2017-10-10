import { ResultProfile } from './../../../../../viewmodel/confPorta/viewhold/resultProfile';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../../../url-service/url.service';
import { InfoRequest } from './../../../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class TableAuxProfileService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public setProfile(cadastro: Cadastro, resultProfile: ResultProfile) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, resultProfile: ResultProfile };
        _data = { cust: cadastro, executor: usr.user, resultProfile: resultProfile };
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
    
    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
import { UrlService } from './../url-service/url.service';
import { Loger } from './../../viewmodel/loger/loger';
import { Injectable } from '@angular/core';

@Injectable()
export class LogerService {

    constructor(
        private urlService: UrlService) { }

    public makeLog(loger: Loger): Promise<Boolean> {
        return this.urlService.request("post", this.urlService.pathFulltestAPI + "crm/log", loger)
            .then(data => {
                return true
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
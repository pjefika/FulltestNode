import { UrlService } from './../url-service/url.service';
import { Loger } from './../../viewmodel/loger/loger';
import { Injectable } from '@angular/core';

@Injectable()
export class LogerService {

    constructor(
        private urlService: UrlService) { }

    makeLog(loger: Loger): Promise<Boolean> {

        return this.urlService.request("post", "fulltestAPI/crm/log", loger)
            .then(data => {
                return true
            })
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
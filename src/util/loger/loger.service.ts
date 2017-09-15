import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../url-service/url.service';
import { Loger } from './../../viewmodel/loger/loger';
import { Injectable } from '@angular/core';

@Injectable()
export class LogerService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public makeLog(loger: Loger): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "crm/log",
            _data: loger
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return true
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
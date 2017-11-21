import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../url-service/url.service';
import { Loger } from './../../viewmodel/loger/loger';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class LogerService extends SuperService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) {
        super();
    }

    public makeLog(loger: Loger): Promise<Boolean> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "crm/log",
            _data: loger,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return true
            })
            .catch(super.handleError);
    }
}
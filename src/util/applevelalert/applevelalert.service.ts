import { Injectable } from '@angular/core';
import { SuperService } from '../superservice/super.service';
import { UrlService } from '../url-service/url.service';

@Injectable()
export class AppLevelAlertService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public testStealer() {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: "4131543457", executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "linha/",
            _data: _data,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 20000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response;
            })
            .catch(super.handleError);
    }

}
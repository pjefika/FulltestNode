import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { AuthBanda } from 'viewmodel/confPorta/authBanda';
import { ResultDeviceMac } from 'viewmodel/confPorta/viewhold/resultDeviceMac';

@Injectable()
export class AuthBandaCpService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public consultar(deviceMac: ResultDeviceMac) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { macOrIp: string, executor: string};
        _data = { macOrIp: deviceMac.mac, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/auth/",
            _data: _data,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as AuthBanda
            })
            .catch(super.handleError);
    }


}
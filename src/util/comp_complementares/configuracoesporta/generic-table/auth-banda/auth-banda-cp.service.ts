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
        let usr = JSON.parse(localStorage.getItem('user'));
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

    public getMock(){
        return { "mensagem": null, "status": "Alive", "data": 1513314136000, "ip_address_v4": "177.132.187.64", "ip_address_v6": "2804:07F4:3086:0AD4::/64", "ipv6_network": "2804:07F4:3206:A4AF::/64", "rin": "465", "bras": "CTA1B", "porta": "45", "userName": "cliente@cliente", "profile": "i1024e15360", "cabinet": "PRCTA_O1B26", "designador": "CTA-813PE2SDIL-013", "cgnat":{ "status":{ "codigo":{ "value": 0 }, "descricao":{ "value": "Nao Migrado" } }, "dados": null } } as AuthBanda;
    }


}
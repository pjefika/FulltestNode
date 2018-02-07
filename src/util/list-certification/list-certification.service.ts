import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Certification } from 'viewmodel/certification/certification';

@Injectable()
export class ListCertificationService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCertificationByCustomer(instancia: string) {
        // let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string };
        _data = { instancia: instancia };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathCustomerAPI + "certification/findByCustomer",
            _data: _data,
            timeout: 60000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Certification[]
            })
            .catch(this.handleError);
    }

}
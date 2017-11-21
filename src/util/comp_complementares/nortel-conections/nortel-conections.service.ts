import { InfoNortelConection } from './../../../viewmodel/nortel-conections/infos-nortel-conection';
import { UrlService } from './../../url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class NortelConectionsService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getSingleton(): Promise<InfoNortelConection[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/singleton/",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection[]
            })
            .catch(super.handleError)
    }

}
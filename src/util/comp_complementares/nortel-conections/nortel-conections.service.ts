import { InfoNortelConection } from './../../../viewmodel/nortel-conections/infos-nortel-conection';
import { UrlService } from './../../url-service/url.service';
import { InfoRequest } from './../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class NortelConectionsService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

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
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
import { Injectable } from '@angular/core';
import { SuperService } from '../superservice/super.service';
import { UrlService } from '../urlservice/url.service';

@Injectable()
export class EnumService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getEnumTv(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            path: "listEnums/tecTv",
            command: "fulltestAPI",
            timeout: 120000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(super.handleError);
    }

    public getEnumVoz(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            path: "listEnums/tecVoz",
            command: "fulltestAPI",
            timeout: 120000
        };

        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(super.handleError);
    }

    public getEnumVelocidades(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            path: "listEnums/velocidades",
            command: "fulltestAPI",
            timeout: 120000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(super.handleError);
    }

}
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
            path: "fulltestAPI/",
            command: "listEnums/tecTv",
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
            path: "fulltestAPI/",
            command: "listEnums/tecVoz",
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
            path: "fulltestAPI/",
            command: "listEnums/velocidades",
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
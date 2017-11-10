import { UrlService } from './../url-service/url.service';
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class EnumService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getEnumTv(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "listEnums/tecTv",
            timeout: 5000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(this.handleError);
    }

    public getEnumVoz(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "listEnums/tecVoz",
            timeout: 5000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(this.handleError);
    }

    public getEnumVelocidades(): Promise<String[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "listEnums/velocidades",
            timeout: 5000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as String[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
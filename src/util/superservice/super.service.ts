import { Injectable } from '@angular/core';
import { InfoRequest } from 'viewmodel/url/infos-url';
import { UrlService } from 'util/url-service/url.service';

@Injectable()
export class SuperService {

    public infoResquest: InfoRequest;

    constructor() { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
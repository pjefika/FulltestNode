import { Injectable } from '@angular/core';
import { UrlEndPoint } from '../../viewmodel/url/urlendpoint';
import { ExceptionService } from '../exceptionservice/exception.service';
import { Http } from '@angular/http';
import { InfoRequest } from 'HttpEasyRequestForPostGet/app/modules/viewmodel/inforequest';

declare var require: any

@Injectable()
export class LinkService extends ExceptionService {

    private whatlink: string = "PROD"; // valida link produção. // PROD // QA // EXT

    // Import ViewModel for Setup the request.
    public infoRequest: InfoRequest;

    constructor(public http: Http) {
        super(http);
    }

    public getLinksMock(): UrlEndPoint {
        let urls: UrlEndPoint;
        switch (this.whatlink) {
            case "PROD":
                urls = require('../../assets/mocks/links/links-prod.json'); //Mock Produção
                break;
            case "QA":
                urls = require('../../assets/mocks/links/links-qa.json'); //Mock QA
                break;
            case "EXT":
                urls = require('../../assets/mocks/links/links-ext.json'); //Mock EXT
                break;
            case "EXTC":
                urls = require('../../assets/mocks/links/links-extc.json'); //Mock EXTC
                break;
        }
        return urls;
    }
}
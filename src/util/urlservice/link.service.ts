import { Injectable } from '@angular/core';
import { UrlEndPoint } from '../../viewmodel/url/urlendpoint';
import { ExceptionService } from '../exceptionservice/exception.service';
import { Http } from '@angular/http';
import { InfoRequest } from 'HttpEasyRequestForPostGet/app/modules/viewmodel/inforequest';

@Injectable()
export class LinkService extends ExceptionService {

    // Import ViewModel for Setup the request.
    public infoRequest: InfoRequest;

    constructor(public http: Http) {
        super(http);
    }

    public mountInfoLinkRequestProd(): InfoRequest {
        let infoRequest: InfoRequest;
        // infoRequest = {
        //     rqst: "get",
        //     command: "getlinks",
        //     path: "getlinks/",
        //     otherUrl: ""
        // }
        return infoRequest;
    }

    public mountInfoLinkRequestQA(): InfoRequest {
        let infoRequest: InfoRequest;
        // infoRequest = {
        //     rqst: "get",
        //     command: "getlinks",
        //     path: "getlinks/",
        //     otherUrl: ""
        // }
        return infoRequest;
    }

    public getLinksMock(): UrlEndPoint {
        //Mock Produção
        return JSON.parse('{"endpoints":[{"nome":"customerAPI","url":"http://10.40.198.168:7171/customerAPI/"},{"nome":"fulltestAPI","url":"http://10.40.198.168:7172/fulltestAPI/"},{"nome":"stealerAPI","url":"http://10.40.198.168:7173/stealerAPI/"},{"nome":"authAPI","url":"http://10.40.198.168:7176/authAPI/"},{"nome":"dmsAPI","url":"http://10.200.35.67:80/dmsAPI/"},{"nome":"acs","url":"http://10.40.198.168:7177/acsAPI/"}]}');
        //Mock QA
        // return JSON.parse('{"endpoints":[{"nome":"customerAPI","url":"http://10.40.196.182:7171/customerAPI/"},{"nome":"fulltestAPI","url":"http://10.40.196.182:7172/fulltestAPI/"},{"nome":"stealerAPI","url":"http://10.40.196.182:7173/stealerAPI/"},{"nome":"authAPI","url":"http://10.40.196.182:7176/authAPI/"},{"nome":"dmsAPI","url":"http://10.200.35.67:80/dmsAPI/"},{"nome":"acs","url":"http://10.200.35.67:80/acs/"}]}');
    }
}
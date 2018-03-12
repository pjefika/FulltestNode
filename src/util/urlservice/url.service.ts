import { Injectable } from '@angular/core';
import { DirectUrlsService } from './direct.urls.service';
import { SystemHolderService } from '../holder/systemHolder.service';
import { Headers, RequestOptions, Http } from '@angular/http';
import { InfoRequest } from '../../viewmodel/inforequest/inforequest';
import { ExceptionService } from '../exceptionservice/exception.service';
import { VariavelHolderService } from '../holder/variavelholder.service';
import { UrlEndPoint } from '../../viewmodel/url/urlendpoint';
import { LinkService } from './link.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UrlService extends LinkService {

    private url: string;

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });

    constructor(private http: Http,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super();
    }

    public request(infoResquest: InfoRequest) {
        if (infoResquest.otherUrl) { // Se for outra URL passa direto...
            return this.hOtherUrl(infoResquest);
        } else { // Caso não passa pelo ByPass
            return this.doGetLinks(infoResquest);
        }
    }

    public linkurl(infoResquest: InfoRequest) {
        const url = infoResquest.otherUrl + infoResquest._data;
        window.open(url);
    }

    private doGetLinks(infoResquest: InfoRequest) {
        // if (this.systemHolderService.ableMock) {
        this.mountLink(this.getLinksMock(), infoResquest);
        return this.doRequest(infoResquest);
        // } else {
        //     let ir: InfoRequest;
        //     if (this.systemHolderService.isLinkProd) {
        //         ir = this.mountInfoLinkRequestProd();
        //     } else {
        //         ir = this.mountInfoLinkRequestQA();
        //     }
        //     this.url = ir.otherUrl;
        //     return this.get(ir)
        //         .then(resposta => {
        //             this.mountLink(resposta, infoResquest);
        //             return this.doRequest(infoResquest);
        //         }, erro => {
        //             console.log("Ocorreu um erro ao buscar lista de Links");
        //         })
        //         .catch(this.handleErrorKing);
        // }
    }

    private mountLink(endpoint?: UrlEndPoint, infoResquest?: InfoRequest) {
        this.url = "";
        if (endpoint && !infoResquest.otherUrl) {
            endpoint.endpoints.forEach(endpoint => {
                if (endpoint.nome === infoResquest.command) {
                    this.url = endpoint.url + infoResquest.path;
                }
            });
        }
    }

    private hOtherUrl(infoResquest: InfoRequest) {
        this.url = infoResquest.otherUrl + infoResquest.path;
        return this.doRequest(infoResquest); // Finaliza
    }

    private doRequest(infoResquest: InfoRequest) {
        switch (infoResquest.rqst) {
            case "post":
                return this.post(infoResquest);
            case "get":
                return this.get(infoResquest);
        }
    }

    private post(infoResquest: InfoRequest) {
        return this.http.post(this.url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private get(infoResquest: InfoRequest) {
        let rstlink;
        if (infoResquest._data) {
            this.url = this.url + infoResquest._data;
        }
        return this.http.get(this.url, this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

}
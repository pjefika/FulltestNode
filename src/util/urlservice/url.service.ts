import { Injectable } from '@angular/core';
import { RequestActionInterface } from '../../viewmodel/inforequest/request-action.interface';
import { InfoRequest } from '../../viewmodel/inforequest/inforequest';

import { Headers, RequestOptions, Http } from '@angular/http';
import { SystemHolderService } from '../holder/systemHolder.service';

import 'rxjs/add/operator/timeout'

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { DirectUrlsService } from './direct.urls.service';

@Injectable()
export class UrlService extends DirectUrlsService implements RequestActionInterface {

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });

    constructor(private http: Http,
        public systemHolderService: SystemHolderService) {
        super();
    }

    //Todo mundo tem que fazer a chamada para o request passando o InfoRequest.
    public request(infoResquest: InfoRequest) {
        this.hOtherUrl(infoResquest);
        if (this.url) {
            switch (infoResquest.rqst) {
                case "get":
                    return this.get(infoResquest);
                case "post":
                    return this.post(infoResquest);
            }
        }
    }

    private hOtherUrl(infoResquest: InfoRequest) {
        if (infoResquest.otherUrl) {
            this.url = infoResquest.otherUrl + infoResquest.command;
        } else {
            this.mountPath(infoResquest);
        }
    }

    private mountPath(infoResquest: InfoRequest) {
        switch (infoResquest.path) {
            case "customerAPI/":
                if (this.systemHolderService.isLinkProd) {
                    this.url = this.customerProd + infoResquest.path + infoResquest.command;
                } else {
                    this.url = this.customerQA + infoResquest.path + infoResquest.command;
                }
                break;
            case "fulltestAPI/":
                if (this.systemHolderService.isLinkProd) {
                    this.url = this.fulltestProd + infoResquest.path + infoResquest.command;
                } else {
                    this.url = this.fulltestQA + infoResquest.path + infoResquest.command;
                }
                break;
            case "stealerAPI/":
                if (this.systemHolderService.isLinkProd) {
                    this.url = this.stealerProd + infoResquest.path + infoResquest.command;
                } else {
                    this.url = this.stealerQA + infoResquest.path + infoResquest.command;
                }
                break;
            default:
                console.log("Não encontrado...");
                break;
        }
    }

    public post(infoResquest: InfoRequest) {
        return this.http.post(this.url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    public get(infoResquest: InfoRequest) {
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

    /**
     * Fork Join limitado somente para 2 inforequest.
     */
    public postJoin(infoResquests: InfoRequest[]) {
        return Observable.forkJoin(
            this.http.post(infoResquests[0].command, JSON.stringify(infoResquests[0]._data), this.options)
                .map(resposta => resposta.json()),
            this.http.post(infoResquests[1].command, JSON.stringify(infoResquests[1]._data), this.options)
                .map(resposta => resposta.json())
        )
            .map(resposta => {
                return resposta;
            }, erro => {
                super.handleErrorKing;
            })
            .timeout(infoResquests[0].timeout);
    }

    public linkurl(infoResquest: InfoRequest) {
        const url = infoResquest.otherUrl + infoResquest._data;
        window.open(url);
    }

    public otherUrlMake(isqasixtyseven?: boolean): string {
        let url: string;
        if (isqasixtyseven) {
            url = this.urlNSixtySeven;
        } else if (this.systemHolderService.isLinkProd) {
            url = this.urlNProd;
        } else {
            url = this.urlNQA;
        }
        return url;
    }

}
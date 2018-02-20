import { Injectable } from '@angular/core';
import { SuperService } from '../superservice/super.service';
import { RequestActionInterface } from '../../viewmodel/inforequest/request-action.interface';
import { InfoRequest } from '../../viewmodel/inforequest/inforequest';

import { Headers, RequestOptions, Http } from '@angular/http';
import { SystemHolderService } from '../holder/systemHolder.service';

import 'rxjs/add/operator/timeout'

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class UrlService extends SuperService implements RequestActionInterface {

    // IPS: 
    //  "http://10.40.195.81:8080/"  QA
    //  "http://10.40.198.168:8080/"; Produção CO
    //  "http://10.200.35.67:80/" Produção Eng
    //  "http://dprcuradm0111:8080/"; Produção CRM

    public urlIpProd = "http://10.40.195.81:7171/";  // Produção e restante dos pjs para o path
    public urlIpQA = "http://10.40.195.81:7171/";  // Produção e restante dos pjs para o path

    //Path names
    public pathFulltestAPI = "fulltestAPI/";
    public pathStealerAPI = "stealerAPI/"; // stealerAPI_qa
    public pathAuth = "efikaAuth/";
    public pathDmsAPI = "dmsAPI/";
    public pathNetworkInventory = "networkInventoryAPI/";
    public pathAcs = "acs/";
    public pathPlRestAPI = "plrestAPI/";
    public pathCustomerAPI = "customerAPI/";

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    private url;

    constructor(private http: Http, public systemHolderService: SystemHolderService) {
        super();
    }

    //Todo mundo tem que fazer a chamada para o request passando o InfoRequest.
    public request(infoResquest: InfoRequest) {
        this.hOtherUrl(infoResquest.otherUrl);
        switch (infoResquest.rqst) {
            case "get":
                return this.get(infoResquest);
            case "post":
                return this.post(infoResquest);
        }
    }

    private hOtherUrl(link: string) {
        if (link) {
            this.url = link;
        } else {
            if (this.systemHolderService.isLinkProd) {
                this.url = this.urlIpProd;
            } else {
                this.url = this.urlIpQA;
            }
        }
    }

    public post(infoResquest: InfoRequest) {
        const url = `${this.url}` + infoResquest.command;
        return this.http.post(url, JSON.stringify(infoResquest._data), this.options)
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
            rstlink = infoResquest.command + infoResquest._data;
        } else {
            rstlink = infoResquest.command;
        }
        const url = `${this.url}` + rstlink;
        return this.http.get(url, this.options)
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
            this.http.post(`${this.url}` + infoResquests[0].command, JSON.stringify(infoResquests[0]._data), this.options)
                .map(resposta => resposta.json()),
            this.http.post(`${this.url}` + infoResquests[1].command, JSON.stringify(infoResquests[1]._data), this.options)
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

}
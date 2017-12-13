import { InfoRequest } from './../../viewmodel/url/infos-url';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestAction } from 'util/url-service/url-service.interface';
import { SuperService } from 'util/superservice/super.service';


@Injectable()
export class UrlService extends SuperService implements RequestAction {

    //Modificar IPs 
    public urlIp = "http://10.200.35.67:80/";  // Produção e restante dos pjs para o path
    public urlIpParaStealer = "http://10.40.195.81:8080/"; // A stealer que ira ficar aqui // PeleServ
    // IPS: 
    //  "http://10.40.195.81:8080/" || "http://10.40.198.168:8080/"; QA
    //  "http://10.200.35.67:80/" Produção
    //  "http://dprcuradm0111:8080/"; CRM

    //Modificar path names
    public pathFulltestAPI = "fulltestAPI/";
    public pathStealerAPI = "stealerAPI/"; // stealerAPI_qa
    public pathAuth = "efikaAuth/";
    public pathDmsAPI = "dmsAPI/";
    public pathNetworkInventory = "networkInventoryAPI/";
    public pathAcs = "acs/";

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    private url;

    constructor(private http: Http) { super(); }

    //Todo mundo faz a chamada para o request passando o InfoRequest.
    public request(infoResquest: InfoRequest) {
        //Verifica se url é outra
        this.hOtherUrl(infoResquest.otherUrl);
        switch (infoResquest.rqst) {
            case "get":
                return this.get(infoResquest);
            case "post":
                return this.post(infoResquest);
        }
    }

    private hOtherUrl(l) {
        if (l) {
            this.url = l;
        } else {
            this.url = this.urlIp;
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
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }
}
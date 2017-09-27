import { InfoRequest } from './../../viewmodel/url/infos-url';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

    //Modificar IPs 
    public urlIp = "http://10.200.35.67:80/";  // Produção e restante dos pjs para o path
    public urlIpParaStealer = "http://10.40.195.81:8080/"; // A stealer que ira ficar aqui // PeleServ
    // IPS: 
    //  "http://10.40.195.81:8080/";
    //  "http://10.200.35.67:80/";
    //  "http://dprcuradm0111:8080/";

    //Modificar path names
    public pathFulltestAPI = "fulltestAPI/";
    public pathStealerAPI = "stealerAPI/"; //stealerAPI_qa
    public pathAuth = "efikaAuth/";
    public pathDmsAPI = "dmsAPI/";

    //Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    private url;

    constructor(private http: Http) { }

    //Todo mundo faz a chamada para o request passando o InfoRequest.
    public request(infoResquest: InfoRequest) {
        //Verifica se url é outra
        this.hOtherUrl(infoResquest.otherUrl);
        switch (infoResquest.rqst) {
            case "get":
                return this.httpGetRequest(infoResquest);
            case "post":
                return this.httpPostRequest(infoResquest);
        }
    }

    private httpPostRequest(infoResquest: InfoRequest) {
        const url = `${this.url}` + infoResquest.command;
        return this.http.post(url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    private httpGetRequest(infoResquest: InfoRequest) {
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
            .catch(this.handleError);
    }

    private hOtherUrl(l) {
        if (l) {
            this.url = l;
        } else {
            this.url = this.urlIp;
        }
    }

    public handleError(error: any): Promise<any> {
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }
}
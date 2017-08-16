import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

    private urlIp = "10.40.195.81:8080/";
    //private urlIp = "10.200.35.67:80";

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    public url = "http://" + this.urlIp;

    constructor(private http: Http) { }

    public request(rqst: string, command: string, _data?: any, otherUrl?: string) {
        //Verifica se url é outra
        this.hOtherUrl(otherUrl);
        switch (rqst) {
            case "get":
                return this.httpGetRequest(command, _data, otherUrl);
            case "post":
                return this.httpPostRequest(command, _data, otherUrl);
        }
    }

    private httpPostRequest(command: string, _data: any, otherUrl?: string) {
        const url = `${this.url}` + command;
        return this.http.post(url, JSON.stringify(_data), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    private httpGetRequest(command: string, _data?: any, otherUrl?: string) {
        let rstlink;
        if (_data) {
            rstlink = command + _data;
        } else {
            rstlink = command;
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

    hOtherUrl(l) {
        if (l) {
            this.urlIp = l;
        }
    }

    public handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
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
import { Loger } from './../../viewmodel/loger/loger';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LogerService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private fulltestAPIUrl = 'http://10.40.195.81:8080/fulltestAPI/crm/';  // URL to FulltestAPI

    constructor(private http: Http) { }

    makeLog(loger: Loger) {
        const url = `${this.fulltestAPIUrl}` + "log/";
        this.http.post(url, JSON.stringify(loger), this.options)
            .timeout(10000)
            .toPromise()
            .then(response => {
                //console.log(response.json());
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }
}
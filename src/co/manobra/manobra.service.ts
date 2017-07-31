import { Motivo } from './../../viewmodel/manobra/motivo';
import { Analitico } from './../../viewmodel/manobra/analitico';
import { element } from 'protractor';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ManobraService {

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headersAppJson });
    private fulltestUrl = 'http://10.40.195.81:8080/fulltestAPI_manobra/';  // URL to FulltestAPI **--** Modificar path pois está em outro path....
    private manobraAssertsUrl = 'http://10.40.195.81:8080/stealerAPI/';

    constructor(private http: Http) { }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        const url = `${this.fulltestUrl}` + "fulltest/manobra/";
        //console.log(url);
        return this.http.post(url, JSON.stringify(cadastro), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as ObjectValid
            }).catch(this.handleError);
    }

    //Multiple requests
    getRn(cadastro: Cadastro, ordem: string, ): Observable<Cadastro> {
        const urlStealer = `${this.manobraAssertsUrl}` + "manobra/asserts";
        const urlFulltest = `${this.fulltestUrl}` + "manobra/asserts";    
        let _data: { cust: Cadastro, workOrderId: string };
        _data = { cust: cadastro, workOrderId: ordem };
        return Observable.forkJoin(
            this.http.post(urlStealer, JSON.stringify(_data), this.options)
                .map(res => res.json()),
            this.http.post(urlFulltest, JSON.stringify(cadastro), this.options)
                .map(res => res.json())
        ).map(
            data => {
                data[0].forEach(element => {
                    cadastro.asserts.push(element);
                });
                data[1].forEach(element => {
                    cadastro.asserts.push(element);
                });                
                return cadastro as Cadastro;
            }, err => {
                this.handleError(err);
            }
            )
    }

    getAnalitico(cadastro: Cadastro, motivoSelected: string, executor: string): Promise<Analitico> {
        const urlFulltest = `${this.fulltestUrl}` + "manobra/analitico";
        let _data: { cust: Cadastro, motivo: string, executor: string }
        _data = { cust: cadastro, motivo: motivoSelected, executor: executor }
        return this.http.post(urlFulltest, JSON.stringify(_data), this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as Analitico[];
            })
            .catch(this.handleError);
    }

    getListaMotivo(): Promise<Motivo[]> {
        const urlFulltest = `${this.fulltestUrl}` + "manobra/motivos";
        return this.http.get(urlFulltest, this.options)
            .timeout(120000)
            .toPromise()
            .then(response => {
                return response.json() as Motivo[]
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
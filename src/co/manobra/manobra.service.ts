import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Motivo } from './../../viewmodel/manobra/motivo';
import { Analitico } from './../../viewmodel/manobra/analitico';
import { element } from 'protractor';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ManobraService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService,
        private http: Http) { }

    getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/manobra/",
            _data: cadastro
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ObjectValid
            })
            .catch(this.handleError);
    }

    getAnalitico(cadastro: Cadastro, motivoSelected: string, executor: string): Promise<Analitico> {
        let _data: { cust: Cadastro, motivo: string, executor: string }
        _data = { cust: cadastro, motivo: motivoSelected, executor: executor }
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "manobra/analitico",
            _data: _data
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Analitico[];
            })
            .catch(this.handleError);
    }

    getListaMotivo(): Promise<Motivo[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "manobra/motivos"
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Motivo[]
            })
            .catch(this.handleError);
    }

    //Multiple requests
    getRn(cadastro: Cadastro, ordem: string, ): Observable<Cadastro> {
        const urlStealer = this.urlService.url + this.urlService.pathFulltestAPI + "manobra/asserts";
        const urlFulltest = this.urlService.url + this.urlService.pathStealerAPI + "manobra/asserts";
        let _data: { cust: Cadastro, workOrderId: string };
        _data = { cust: cadastro, workOrderId: ordem };
        return Observable.forkJoin(
            this.http.post(urlStealer, JSON.stringify(cadastro), this.urlService.options)
                .map(res => res.json()),
            this.http.post(urlFulltest, JSON.stringify(_data), this.urlService.options)
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
                this.urlService.handleError(err);
            }
            )
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
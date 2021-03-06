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
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ManobraService extends SuperService {

    constructor(private http: Http,
        private urlService: UrlService) {
        super();
    }

    public getValidacao(cadastro: Cadastro): Promise<ObjectValid> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/manobra/",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ObjectValid
            })
            .catch(super.handleError);
    }

    public getAnalitico(cadastro: Cadastro, motivoSelected: string, executor: string): Promise<Analitico> {
        let _data: { cust: Cadastro, motivo: string, executor: string }
        _data = { cust: cadastro, motivo: motivoSelected, executor: executor }
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "manobra/analitico",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Analitico[];
            })
            .catch(super.handleError);
    }

    public getListaMotivo(): Promise<Motivo[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "manobra/motivos",
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Motivo[]
            })
            .catch(super.handleError);
    }

    //Multiple requests
    public getRn(cadastro: Cadastro, ordem: string, ): Observable<Cadastro> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        const urlStealer = this.urlService.urlIp + this.urlService.pathFulltestAPI + "manobra/asserts";
        const urlFulltest = this.urlService.urlIpParaStealer + this.urlService.pathStealerAPI + "manobra/asserts";
        let _data: { cust: Cadastro, workOrderId: string, executor: string  };
        _data = { cust: cadastro, workOrderId: ordem, executor: usr.user };
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
            }, error => {
                super.handleError(error);
            })
            .timeout(120000);
    }

}
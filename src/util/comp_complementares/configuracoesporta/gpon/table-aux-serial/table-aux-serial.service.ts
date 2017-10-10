import { ResultSerial } from './../../../../../viewmodel/confPorta/viewhold/resultSerial';
import { SerialReturn } from './../../../../../viewmodel/confPorta/return-serial/serial-return';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../../../url-service/url.service';
import { InfoRequest } from './../../../../../viewmodel/url/infos-url';
import { Injectable } from '@angular/core';

@Injectable()
export class TableAuxSerialService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public unsetOntFromOlt(cadastro: Cadastro) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/unsetOntFromOlt",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as SerialReturn[]
            })
            .catch(this.handleError);
    }

    public setOntToOlt(cadastro: Cadastro, serial: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string, serial: { serial: string } };
        _data = { cust: cadastro, executor: usr.user, serial: { serial: serial } };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/setOntToOlt",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ResultSerial
            })
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
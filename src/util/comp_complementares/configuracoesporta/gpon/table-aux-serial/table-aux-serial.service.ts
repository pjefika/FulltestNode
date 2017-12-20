import { ResultSerial } from './../../../../../viewmodel/confPorta/viewhold/resultSerial';
import { SerialReturn } from './../../../../../viewmodel/confPorta/return-serial/serial-return';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { UrlService } from './../../../../url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class TableAuxSerialService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public unsetOntFromOlt(cadastro: Cadastro) {
        let usr = JSON.parse(localStorage.getItem('user'));
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
            .catch(super.handleError);
    }

    public setOntToOlt(cadastro: Cadastro, serial: string) {
        let usr = JSON.parse(localStorage.getItem('user'));
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
            .catch(super.handleError);
    }

}
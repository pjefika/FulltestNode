import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { UrlService } from 'util/url-service/url.service';
import { VlanBanda } from 'viewmodel/confPorta/vlanBanda';

@Injectable()
export class TableLanCpService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setVlanGeneric(cadastro: Cadastro, whatSet: string) {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/" + whatSet,
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as VlanBanda
            })
            .catch(super.handleError);
    }

    public resetIptvStatistics(cadastro: Cadastro) {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "configPorta/resetIptvStatistics",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as any[]
            })
            .catch(super.handleError);
    }

}
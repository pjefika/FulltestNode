import { Injectable } from '@angular/core';
import { UrlService } from 'util/url-service/url.service';
import { Equipamento } from 'viewmodel/acs/equipamento';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class AcsService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getEquipamentoAssoc(input: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: "SUBSCRIBER", input: input, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathAcs + "search/search",
            _data: _data,
            timeout: 60000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Equipamento[]
            })
            .catch(super.handleError);
    }

    public abreSearchDevice(deviceId: number) {
        this.infoResquest = {
            rqst: "",
            command: "",
            _data: deviceId,
            otherUrl: "http://10.40.195.81/acs/searchEqp/", // Trocar link para produção quando for lançado...
            timeout: 60000
        };
        this.urlService.linkurl(this.infoResquest);
    }

}
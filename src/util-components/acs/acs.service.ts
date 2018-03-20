import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { Equipamento } from '../../viewmodel/acs/equipamento';
import { Http } from '@angular/http';
import { LinkService } from '../../util/urlservice/link.service';

@Injectable()
export class AcsService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getEquipamentoAssoc(input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: "SUBSCRIBER", input: input, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "acs", "search/search"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Equipamento[];
            })
            .catch(super.handleErrorKing);
    }

    public abreSearchDevice(deviceId: number) {
        this.infoRequest = {
            url: "http://10.40.198.168/acs/searchEqp/",
            _data: deviceId,
            timeout: 1000
        };
        return super.goToUrl(this.infoRequest);
    }

    public getEquipamentoAssocMock(): Equipamento[] {
        return JSON.parse('');
    }

}
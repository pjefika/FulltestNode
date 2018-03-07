import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Equipamento } from '../../viewmodel/acs/equipamento';

@Injectable()
export class AcsService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getEquipamentoAssoc(input: string): Promise<Equipamento[]> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: "SUBSCRIBER", input: input, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "NotImplemented",
            command: this.urlService.pathAcs + "search/search",
            otherUrl: this.urlService.otherUrlMake(true),
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
            _data: deviceId,
            otherUrl: "http://10.40.198.168/acs/searchEqp/"
        };
        this.urlService.linkurl(this.infoResquest);
    }

    public getEquipamentoAssocMock(): Equipamento[] {

        return JSON.parse('');
    }

}
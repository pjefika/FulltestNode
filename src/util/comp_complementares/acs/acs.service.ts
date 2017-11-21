import { Injectable } from '@angular/core';
import { UrlService } from 'util/url-service/url.service';
import { InfoRequest } from 'viewmodel/url/infos-url';
import { Equipamento } from 'viewmodel/acs/equipamento';

@Injectable()
export class AcsService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

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
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { Evento } from 'viewmodel/evento-massivo/eventos';
import { EventoMassivo } from 'viewmodel/evento-massivo/evento-massivo';

@Injectable()
export class EventoMAssivoService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getAfetaCliente(cadastro: Cadastro) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathPlRestAPI + "eventosMassivos/afetaCliente",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as EventoMassivo[];
            })
            .catch(super.handleError);
    }

}
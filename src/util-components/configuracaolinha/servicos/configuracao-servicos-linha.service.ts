import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { ServicoLinha } from '../../../viewmodel/linha/servicolinha';

@Injectable()
export class ConfiguracaoServicosLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super()
    }


    public getServicos(): Promise<ServicoLinha[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/servicos",
            otherUrl: "http://10.40.198.168:8080/",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ServicoLinha[];
            })
            .catch(super.handleError);
    }
}
import { Injectable } from '@angular/core';
import { SuperService } from '../../../../../util/superservice/super.service';
import { UrlService } from '../../../../../util/urlservice/url.service';
import { Ncos } from '../../../../../viewmodel/linha/ncos';
import { Linha } from '../../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracaoLinhaNcosService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getNcos(): Promise<Ncos[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/ncos",
            otherUrl: "http://10.200.35.67:80/",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Ncos[];
            })
            .catch(super.handleError);
    }

    public setNcos(linha: Linha, ncos: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, ncos: string, executor: string };
        _data = { dms: dms, ncos: ncos, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/editarNcos",
            _data: _data,
            otherUrl: "http://10.200.35.67:80/",
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }

}
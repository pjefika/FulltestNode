import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { Ncos } from './../../../../../viewmodel/cadastro-linha/ncos';
import { UrlService } from './../../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class NcosService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getNcos(): Promise<Ncos[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/ncos",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Ncos[];
            })
            .catch(super.handleError)
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
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }
}
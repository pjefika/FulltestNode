import { InfoRequest } from './../../../../viewmodel/url/infos-url';
import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { Ncos } from './../../../../viewmodel/cadastro-linha/ncos';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NcosService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getNcos(): Promise<Ncos[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/ncos",
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Ncos[];
            })
            .catch(this.handleError)
    }

    public setNcos(linha: Linha, ncos: string): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, ncos: string, executor: string };
        _data = { dms: dms, ncos: ncos, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/editarNcos",
            _data: _data
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
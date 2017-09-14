import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { Ncos } from './../../../../viewmodel/cadastro-linha/ncos';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NcosService {

    constructor(
        private urlService: UrlService) { }

    public getNcos(): Promise<Ncos[]> {
        return this.urlService.request("get", this.urlService.pathDmsAPI + "dms/ncos")
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
        return this.urlService.request("post", this.urlService.pathDmsAPI + "dms/editarNcos", _data)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
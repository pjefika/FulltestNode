import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { Servico } from './../../../../viewmodel/cadastro-linha/servicos';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicoLinhaService {

    constructor(
        private urlService: UrlService) { }

    public getServicos(): Promise<Servico[]> {
        return this.urlService.request("get", this.urlService.pathDmsAPI + "dms/servicos")
            .then(data => {
                return data as Servico[];
            })
            .catch(this.handleError);
    }

    public setEditarServicos(linha: Linha, services: string[]): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, services: string[], executor: string };
        _data = { dms: dms, services: services, executor: usr.user };
        return this.urlService.request("post", this.urlService.pathDmsAPI + "dms/editarServicos", _data)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
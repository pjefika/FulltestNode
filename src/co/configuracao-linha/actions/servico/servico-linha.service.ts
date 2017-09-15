import { InfoRequest } from './../../../../viewmodel/url/infos-url';
import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { Servico } from './../../../../viewmodel/cadastro-linha/servicos';
import { UrlService } from './../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ServicoLinhaService {

    private infoResquest: InfoRequest;

    constructor(
        private urlService: UrlService) { }

    public getServicos(): Promise<Servico[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "dms/servicos",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
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
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/editarServicos",
            _data: _data,
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}
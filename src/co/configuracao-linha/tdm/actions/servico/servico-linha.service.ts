import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { Cadastro } from './../../../../../viewmodel/cadastro/cadastro';
import { Servico } from './../../../../../viewmodel/cadastro-linha/servicos';
import { UrlService } from './../../../../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ServicoLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

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
            .catch(super.handleError);
    }

    public setEditarServicos(cad: Cadastro, services: string[]): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: cad.linha.dn, central: cad.linha.central }
        let _data: { instancia: string, dms: any, services: string[], executor: string };
        _data = { instancia: cad.instancia, dms: dms, services: services, executor: usr.user };
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
            .catch(super.handleError);
    }

}
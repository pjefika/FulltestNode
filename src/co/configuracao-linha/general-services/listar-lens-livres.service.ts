import { ConfiguracoesLensLivres } from './../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { LensLivres } from './../../../viewmodel/cadastro-linha/lens-livres/lens-livres';
import { Linha } from './../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ListarLensLivresService {

    constructor(
        private urlService: UrlService) { }

    public getLensLivres(linha: Linha): Promise<ConfiguracoesLensLivres> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        return this.urlService.request("post", this.urlService.pathDmsAPI + "dms/consultarConfiguracoesShelf", _data)
            .then(data => {
                return data as ConfiguracoesLensLivres;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { UrlService } from './../../../../util/url-service/url.service';
import { ConfiguracoesLensLivres } from './../../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class ListarLensLivresService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getLensLivres(linha: Linha): Promise<ConfiguracoesLensLivres> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/consultarConfiguracoesShelf",
            _data: _data,
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ConfiguracoesLensLivres;
            })
            .catch(super.handleError);
    }

}
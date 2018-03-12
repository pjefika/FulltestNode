import { Injectable } from '@angular/core';
import { UrlService } from '../../../util/urlservice/url.service';
import { SuperService } from '../../../util/superservice/super.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { ConfLensLivres } from '../../../viewmodel/linha/lens-livres/confLensLivres';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';

@Injectable()
export class ConfiguracoesGeraisLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super()
    }

    public getLinha(instancia: string): Promise<Linha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "linha/",
            command: "stealerAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Linha;
            })
            .catch(super.handleError);
    }

    public getLensLivres(linha: Linha): Promise<ConfLensLivres> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "dms/consultarConfiguracoesShelf",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as ConfLensLivres;
            })
            .catch(super.handleError);
    }

    public resetarPorta(linha: Linha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "dms/resetarPorta",
            command: "dmsAPI",
            _data: _data,
            timeout: 200000
        }
        //(this.infoResquest)
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }


}
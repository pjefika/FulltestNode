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
            path: "stealerAPI/",
            command: "linha/",
            _data: _data,
            timeout: 6000
        };
        // this.infoResquest = {
        //     rqst: "post",
        //     command: this.urlService.pathStealerAPI + "linha/",
        //     _data: _data,
        //     path: "NotImplemented",
        //     otherUrl: this.urlService.otherUrlMake(),
        //     timeout: 60000
        // }
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
            path: "NotImplemented",
            command: this.urlService.pathDmsAPI + "dms/consultarConfiguracoesShelf",
            _data: _data,
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
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
            command: this.urlService.pathDmsAPI + "dms/resetarPorta",
            _data: _data,
            path: "NotImplemented",
            otherUrl: this.urlService.otherUrlMake(true),
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
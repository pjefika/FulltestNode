import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { ConfLensLivres } from '../../../viewmodel/linha/lens-livres/confLensLivres';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracoesGeraisLinhaService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getLinha(instancia: string): Promise<Linha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "stealerAPI", "linha/"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as Linha;
            })
            .catch(super.handleErrorKing);
    }

    public getLensLivres(linha: Linha): Promise<ConfLensLivres> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/consultarConfiguracoesShelf"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as ConfLensLivres;
            })
            .catch(super.handleErrorKing);
    }

    public resetarPorta(linha: Linha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/resetarPorta"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
            })
            .catch(super.handleErrorKing);
    }


}
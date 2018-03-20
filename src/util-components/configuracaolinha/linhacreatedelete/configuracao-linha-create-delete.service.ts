import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Len } from '../../../viewmodel/linha/len';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoLinhaCreateDeleteService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public setDeletarLinha(linha: Linha, cadastroLinha: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: Len, executor: string };
        _data = { dms: dms, len: cadastroLinha.len, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/deletarLinha"),
            _data: _data,
            timeout: 120000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
            })
            .catch(super.handleErrorKing);
    }

    public setCriarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: CadastroLinha, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/criarLinha"),
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
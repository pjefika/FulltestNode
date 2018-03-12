import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Len } from '../../../viewmodel/linha/len';

@Injectable()
export class ConfiguracaoLinhaCreateDeleteService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public setDeletarLinha(linha: Linha, cadastroLinha: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: Len, executor: string };
        _data = { dms: dms, len: cadastroLinha.len, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "dms/deletarLinha",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError)
    }

    public setCriarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: CadastroLinha, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "dms/criarLinha",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }
}
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
        let _data: { dms: any, len: any, executor: string };
        _data = { dms: dms, len: cadastroLinha.len, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/deletarLinha",
            _data: _data,
            otherUrl: "http://10.200.35.67:80/",
            timeout: 200000
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
            command: this.urlService.pathDmsAPI + "dms/criarLinha",
            _data: _data,
            otherUrl: "http://10.200.35.67:80/",
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }
}
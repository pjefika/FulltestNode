import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { Len } from '../../../viewmodel/linha/len';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Customer } from '../../../viewmodel/customer/customer';

@Injectable()
export class ConfiguracaoManobraLinhaService extends SuperService {

    constructor(private urlService: UrlService) {
        super()
    }

    public setManobrarLinha(linha: Linha, len: Len, cadastroLinhaBinada: CadastroLinha): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, len: any, confBinada: any, executor: string };
        _data = { dms: dms, len: len, confBinada: cadastroLinhaBinada, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/manobrarLinha",
            _data: _data,
            otherUrl: "http://10.40.198.168:8080/",
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha;
            })
            .catch(super.handleError);
    }

    public setEditarServicos(cad: Customer, services: string[]): Promise<CadastroLinha> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: cad.linha.dn, central: cad.linha.central }
        let _data: { instancia: string, dms: any, services: string[], executor: string };
        _data = { instancia: cad.instancia, dms: dms, services: services, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathDmsAPI + "dms/editarServicos",
            _data: _data,
            otherUrl: "http://10.40.198.168:8080/",
            timeout: 200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as CadastroLinha
            })
            .catch(super.handleError);
    }


}
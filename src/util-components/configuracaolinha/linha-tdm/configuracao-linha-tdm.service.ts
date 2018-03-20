import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class ConfiguracaoLinhaTdmService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getInformacoes(linha: Linha) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let dms = { dn: linha.dn, central: linha.central }
        let _data: { dms: any, executor: string };
        _data = { dms: dms, executor: usr.user };
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "dms/consultar"),
            _data: _data,
            timeout: 60000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as CadastroLinha;
            })
            .catch(super.handleError);        
    }

    public getInformacoesMock(): CadastroLinha {
        return JSON.parse('{"dn":"4131543457","len":{"cnl":"CTA","ard":"C  50","shelf":6,"porta":85,"len":"CTAC  50 6 00 85","alternate":false},"custGrp":"CTA_POS","ncos":{"ncos":115,"desc":"Ligue Simples","key":"NCOS_115"},"status":"CREATED","servicos":[{"desc":"Digital (TOM / TONE)","key":"DGT","nome":"DIGITAL","tipo":"SERVICO","nivel":"SIMPLE"},{"desc":"Identificador de Chamadas","key":"DDN NOAMA","nome":"IDENT_CHAM","tipo":"SERVICO","nivel":"SIMPLE"}],"estado":{"nome":"IDL","desc":"Idle - Assinante Livre.","key":"IDL","valid":true}}');
    }

}
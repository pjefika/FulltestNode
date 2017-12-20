import { Rede } from './../../viewmodel/cadastro/rede';
import { InfoRequest } from './../../viewmodel/url/infos-url';
import { UrlService } from './../../util/url-service/url.service';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCadastro(instancia: string): Promise<Cadastro> {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            otherUrl: this.urlService.urlIpParaStealer,
            timeout: 63000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }

    public getCadastroDOne(instancia: string): Promise<Cadastro> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathNetworkInventory + "networkInventory/",
            _data: instancia,
            timeout: 10000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }

    public getMock(): Cadastro {
        return { "designador": "CTA-81AFTMOU6-013", "instancia": "4133335556", "designadorAcesso": "CTA-03247925-069", "rede": { "tipo": "METALICA", "origem": "ONLINE", "planta": "VIVO2", "ipDslam": "10.141.249.194", "vendorDslam": "KEYMILE", "modeloDslam": "SUVD3", "slot": 17, "porta": 15, "sequencial": 1015, "logica": 1015, "rin": 478, "vlanVoip": 1478, "vlanVod": 3478, "vlanMulticast": 4000, "cvLan": 1115 }, "servicos": { "velDown": 51200, "velUp": 5120, "tipoLinha": "TDM" }, "linha": { "tipo": "TDM", "dn": "4160435534", "central": "PRCTA_LPS01" }, "radius": { "status": "ATIVO", "armario": "PRCTA_O1A71", "rin": "478", "velocidade": "51200 - 5120", "ipFixo": "NAO ENCONTROU", "profile": "r5120pb51200p", "porta": "1015", "isIpFixo": true }, "asserts": [{ "asserts": "DIVERGENCIA_TBS_RADIUS", "value": false }, { "asserts": "CIRCUITO_ATIVO", "value": true }, { "asserts": "HAS_BLOQUEIO_RADIUS", "value": false }] } as Cadastro;
    }

}
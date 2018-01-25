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
        return { "designador": "CTA-813PE2SDIL-013", "instancia": "4130157784", "designadorAcesso": "CTA-15958501-069", "designadorTv": "TV-CTA-813PE2SDIU-050", "rede":{ "tipo": "METALICA", "origem": "ONLINE", "planta": "VIVO2", "ipDslam": "10.141.23.164", "vendorDslam": "ZHONE", "modeloDslam": "COMBOZH48", "idOnt": null, "terminal": null, "ipMulticast": null, "nrc": null, "slot": 4, "porta": 45, "sequencial": 45, "logica": 45, "rin": 465, "vlanVoip": 1131, "vlanVod": 3131, "vlanMulticast": 4000, "cvlan": 145, "bhs": null }, "redeExterna":{ "tipo": null, "origem": null, "planta": null, "splitter1n": null, "splitter2n": null, "caboAlim": null, "fibra1n": null, "fibra2n": null }, "servicos":{ "velDown": 15360, "velUp": 1024, "tipoTv": "DTH", "tipoLinha": "TDM" }, "linha":{ "tipo": "TDM", "dn": "4130157784", "central": "PRCTA_LPS01" }, "radius":{ "status": "ATIVO", "armario": "PRCTA_O1B26", "rin": "465", "velocidade": "15360 - 1024", "ipFixo": "-", "profile": "a1024b15360", "porta": "45", "isIpFixo": false }, "asserts":[ { "asserts": "DIVERGENCIA_TBS_RADIUS", "value": false }, { "asserts": "CIRCUITO_ATIVO", "value": true }, { "asserts": "HAS_BLOQUEIO_RADIUS", "value": false } ], "eventos":[] } as Cadastro;
    }

}
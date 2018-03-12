import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Customer } from '../../viewmodel/customer/customer';
@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCadastro(instancia: string): Promise<Customer> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { parameter: string, executor: string };
        _data = { parameter: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "customer/findByParameter",
            command: "customerAPI",
            _data: _data,
            timeout: 63000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Customer
            })
            .catch(super.handleError);
    }

    public getCadastroMock(): Customer {
        // return JSON.parse('{"designador":"ARQ-81CEOKPOC-013","instancia":"1633351800","designadorAcesso":"ARQ-01701684-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.214.57.6","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":8,"porta":1,"sequencial":1542,"logica":6,"rin":3,"vlanVoip":1003,"vlanVod":3003,"vlanMulticast":4000,"cvlan":1642,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"origem":null,"velDown":51200,"velUp":5120,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"1633351800","central":"SPSPO_JUS03"},"radius":{"status":"ATIVO","armario":"SPARQ_G1A02","rin":"003","velocidade":"51200 - 5120","ipFixo":"NAO ENCONTROU","profile":"r5120b51200 op:ARQ-81CEOKPOC-013","porta":"1542","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1520355480918},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1520355480918},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1520355480918}],"eventos":[]}');
        return JSON.parse('{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1519068076539},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1519068076539},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1519068076539}],"eventos":[]}');
    }
}
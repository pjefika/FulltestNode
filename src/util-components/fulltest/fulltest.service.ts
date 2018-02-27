import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Customer } from '../../viewmodel/customer/customer';
import { Certification } from '../../viewmodel/fulltest/certification';

@Injectable()
export class FulltestService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCertificationCO(cadastro: Customer) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { customer: any, executor: string };
        _data = { customer: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "customerAPI/",
            command: "certification/execByParam/",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Certification
            })
            .catch(super.handleError);
    }

    public getCertificationCOParam(instancia: string) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { parameter: string, executor: string };
        _data = { parameter: instancia, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "customerAPI/",
            command: "certification/execByParam/",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as Certification
            })
            .catch(super.handleError);
    }

    public getCertificationCOMock(): Certification {
        return JSON.parse('{"resultado":"FISICAL","orientacao":"Parâmetros fora dos padrões.","id":"5a8ae967933ae9616e5bc980","blocks":[{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Não há bloqueio no Radius.","nome":"HAS_BLOQ_RADIUS"},{"resultado":"OK","orientacao":"Radius e Inventário de Rede OK.","nome":"IS_INV_REDE_EQUALS_RADIUS"},{"resultado":"OK","orientacao":"Inventário de Rede OK.","nome":"HAS_INV_REDE"},{"resultado":"OK","orientacao":"Inventário de Serviços OK.","nome":"HAS_INV_SERV"}],"nome":{"beautyName":"Cadastro","name":"CADASTRO"}},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Rede confiável.","nome":"IS_REDE_BANDA_OK"}],"nome":{"beautyName":"Performance","name":"PERFORMANCE"}},{"resultado":"FISICAL","orientacao":"Parâmetros fora dos padrões.","asserts":[{"resultado":"OK","orientacao":"Porta Ativada (Adm state Up).","nome":"IS_ADM_UP"},{"resultado":"OK","orientacao":"Sincronismo/Link OK.","nome":"IS_OPER_UP"},{"resultado":"FISICAL","orientacao":"Parâmetros fora dos padrões.","nome":"IS_PARAM_OK"},{"resultado":"OK","orientacao":"Modulação configurada corretamente.","nome":"IS_MODUL_OK"},{"resultado":"OK","orientacao":"Mac identificado 28:C8:7A:19:67:18.","nome":"HAS_MAC_DSLAM"}],"nome":{"beautyName":"Conectividade","name":"CONECTIVIDADE"}},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Vlan de Banda configurado corretamente.","nome":"IS_VLANS_OK"},{"resultado":"OK","orientacao":"Profile configurado corretamente.","nome":"IS_PROFILE_OK"}],"nome":{"beautyName":"Serviços","name":"SERVICOS"}}],"dataInicio":1519053120472,"dataFim":1519053159493,"customer":{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1518110630609},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1518110630609},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1518110630609}],"eventos":[]},"executor":"G0034481","fulltest":{"resultado":false,"dataInicio":1519053120482,"dataFim":1519053159312,"mensagem":"Parâmetros fora dos padrões.","id":null,"cl":{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1518110630609},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1518110630609},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1518110630609}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Estado Operacional da Porta","mensagem":"Sincronismo OK.","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Parâmetros","mensagem":"Parâmetros fora dos padrões.","resultado":false,"foiCorrigido":null,"result":{"nome":"Parâmetros","type":"telecom.properties.metalico.TabelaParametrosMetalicoVdsl","snrDown":7.7,"snrUp":9.8,"atnDown":27.2,"atnUp":20.7,"velSincDown":30324,"velSincUp":5992,"velMaxDown":31016,"velMaxUp":8227,"snrDown1":7.7,"snrDown2":-65,"snrUp1":8.8,"snrUp2":6.5,"atnDown1":45.1,"atnDown2":130,"atnUp1":39,"atnUp2":50.6}},{"nome":"Confiabilidade de Rede","mensagem":"Rede confiável.","resultado":true,"foiCorrigido":false,"result":{"nome":"Confiabilidade de Rede","type":"telecom.properties.metalico.TabelaRedeMetalico","pctDown":79826647,"pctUp":154553341,"crcDown":1,"crcUp":4901,"fecDown":293,"fecUp":355922,"resync":0,"tempoMedicao":864000,"crcOk":true,"pctSuficiente":true}},{"nome":"Modulação","mensagem":"Modulação configurada corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Modulação","type":"telecom.properties.metalico.Modulacao","modulacao":"VDSL_17A_B8_12_SUV","modulEnum":"VDSL"}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1185,"svlan":74,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Cliente sem VoIP.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV Híbrida/IPTV.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"MAC do Equipamento","mensagem":"Mac identificado 28:C8:7A:19:67:18.","resultado":true,"foiCorrigido":null,"result":{"nome":"MAC do Equipamento","type":"telecom.properties.DeviceMAC","mac":"28:C8:7A:19:67:18"}}]}}');
    }


}
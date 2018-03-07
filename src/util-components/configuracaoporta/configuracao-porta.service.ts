import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Customer } from '../../viewmodel/customer/customer';
import { ConfPorta } from '../../viewmodel/confporta/confporta';

@Injectable()
export class ConfiguracaoPortaService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getConfigPorta(cadastro: Customer): Promise<ConfPorta> {
        delete cadastro.servicos.origem; // Retirar futuro...
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            path: "fulltestAPI/",
            command: "configPorta/",
            _data: _data,
            timeout: 120000
        }        
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ConfPorta
            })
            .catch(super.handleError);
    }

    public getConfigPortaMock(): ConfPorta {
        //GPON
        // return JSON.parse('{"estadoPorta":{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},"vlanBanda":{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":null,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":367,"svlan":249,"pctDown":null,"pctUp":null,"state":"UP"}},"vlanVoip":{"nome":"Vlan VoIP","mensagem":"Vlan de VoIP configurado corretamente.","resultado":true,"foiCorrigido":null,"result":{"nome":"Vlan VoIP","type":"telecom.properties.VlanVoip","cvlan":367,"svlan":1249,"pctDown":null,"pctUp":null,"state":"UP"}},"vlanVod":{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV.","resultado":true,"foiCorrigido":null,"result":null},"vlanMulticast":null,"parametros":{"nome":"Parâmetros Ópticos","mensagem":"Parâmetros dentro do padrão (entre -8 e -28).","resultado":true,"foiCorrigido":null,"result":{"nome":"Parâmetros Ópticos","type":"telecom.properties.gpon.TabelaParametrosGpon","potOnt":-15.544,"potOlt":-17.6}},"profile":{"atual":{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":null,"result":{"nome":"Profile","type":"telecom.properties.Profile","profileUp":"HSI_25M_RETAIL_UP","profileDown":"HSI_50M_RETAIL_DOWN","down":"VEL_51200","up":"VEL_25600"}},"downValues":[{"vel":"VEL_1024","desc":"1 Mbps"},{"vel":"VEL_3072","desc":"3 Mbps"},{"vel":"VEL_5120","desc":"5 Mbps"},{"vel":"VEL_10240","desc":"10 Mbps"},{"vel":"VEL_15360","desc":"15 Mbps"},{"vel":"VEL_25600","desc":"25 Mbps"},{"vel":"VEL_35840","desc":"35 Mbps"},{"vel":"VEL_51200","desc":"50 Mbps"},{"vel":"VEL_102400","desc":"100 Mbps"},{"vel":"VEL_153600","desc":"150 Mbps"},{"vel":"VEL_204800","desc":"200 Mbps"},{"vel":"VEL_307200","desc":"300 Mbps"}],"upValues":[{"vel":"VEL_1024","desc":"1 Mbps"},{"vel":"VEL_2048","desc":"2 Mbps"},{"vel":"VEL_3072","desc":"3 Mbps"},{"vel":"VEL_5120","desc":"5 Mbps"},{"vel":"VEL_12800","desc":"12.5 Mbps"},{"vel":"VEL_25600","desc":"25 Mbps"},{"vel":"VEL_51200","desc":"50 Mbps"},{"vel":"VEL_76800","desc":"75 Mbps"},{"vel":"VEL_102400","desc":"100 Mbps"},{"vel":"VEL_153600","desc":"150 Mbps"}]},"serial":{"nome":"Associação Serial ONT","mensagem":"Identificado ONT associada: MSTC2A9E252F.","resultado":true,"foiCorrigido":null,"result":{"nome":"Associação Serial ONT","type":"telecom.properties.gpon.SerialOntGpon","serial":"MSTC2A9E252F","slot":null,"porta":null,"idOnt":null}},"serialDisp":null}');
        //Metalico
        return JSON.parse('{"estadoPorta":{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},"vlanBanda":{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":null,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1185,"svlan":74,"pctDown":null,"pctUp":null,"state":"UP"}},"vlanVoip":null,"vlanVod":null,"vlanMulticast":null,"parametros":{"nome":"Parâmetros","mensagem":"Parâmetros fora dos padrões.","resultado":false,"foiCorrigido":null,"result":{"nome":"Parâmetros","type":"telecom.properties.metalico.TabelaParametrosMetalicoVdsl","snrDown":7.5,"snrUp":7.3,"atnDown":27.2,"atnUp":20.7,"velSincDown":30324,"velSincUp":5992,"velMaxDown":30504,"velMaxUp":8115,"snrDown1":7.4,"snrDown2":-65,"snrUp1":6.4,"snrUp2":7.1,"atnDown1":45.1,"atnDown2":130,"atnUp1":39,"atnUp2":50.6}},"profile":{"atual":{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":null,"result":{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}},"downValues":[{"vel":"VEL_3072","desc":"3 Mbps"},{"vel":"VEL_5120","desc":"5 Mbps"},{"vel":"VEL_10240","desc":"10 Mbps"},{"vel":"VEL_15360","desc":"15 Mbps"},{"vel":"VEL_25600","desc":"25 Mbps"},{"vel":"VEL_35840","desc":"35 Mbps"},{"vel":"VEL_51200","desc":"50 Mbps"}]},"tabRede":{"nome":"Confiabilidade de Rede","mensagem":"Rede confiável.","resultado":true,"foiCorrigido":null,"result":{"nome":"Confiabilidade de Rede","type":"telecom.properties.metalico.TabelaRedeMetalico","pctDown":98006667,"pctUp":187671027,"crcDown":1,"crcUp":5450,"fecDown":317,"fecUp":395680,"resync":0,"tempoMedicao":1123200,"crcOk":true,"pctSuficiente":true}}}');
    }

}
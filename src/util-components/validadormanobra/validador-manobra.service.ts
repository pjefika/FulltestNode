import { Injectable } from '@angular/core';
import { SuperService } from '../../util/superservice/super.service';
import { UrlService } from '../../util/urlservice/url.service';
import { Motivo } from '../../viewmodel/manobrar/motivo';
import { Customer } from '../../viewmodel/customer/customer';
import { Analitico } from '../../viewmodel/manobrar/analitico';
import { InfoRequest } from '../../viewmodel/inforequest/inforequest';
import { Observable } from 'rxjs/Observable';
import { Fulltest } from '../../viewmodel/fulltest/fulltest';
import { Assert } from '../../viewmodel/asserts/assert';

@Injectable()
export class ValidadorManobraService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getListaMotivo(): Promise<Motivo[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathFulltestAPI + "manobra/motivos",
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 120000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Motivo[]
            })
            .catch(super.handleError);
    }

    public getListaMotivoMock(): Motivo[] {
        return JSON.parse('[{"name":"AUTH_SINC","motivo":"Sem Autenticação/Sincronismo"},{"name":"MUDA","motivo":"Linha Muda"},{"name":"QUEDA","motivo":"Quedas"},{"name":"RUIDO","motivo":"Ruído/Chiado"},{"name":"SEMNAVEG","motivo":"Não Navega"},{"name":"NAO_ATINGE","motivo":"Não Atinge Velocidade"}]');
    }

    public getAnalitico(cadastro: Customer, motivoSelected: string): Promise<Analitico> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: Customer, motivo: string, executor: string }
        _data = { cust: cadastro, motivo: motivoSelected, executor: usr.user }
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "manobra/analitico",
            _data: _data,
            path: "NotImplemented",
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 120000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Analitico;
            })
            .catch(super.handleError);
    }

    public getAnaliticoMock(): Analitico {
        return JSON.parse('{"analises":[{"motivo":{"name":"AUTH_SINC","motivo":"Sem Autenticação/Sincronismo"},"conclusao":{"nome":"PORTA_OK","frase":"Porta Ok"}},{"motivo":{"name":"MUDA","motivo":"Linha Muda"},"conclusao":{"nome":"PORTA_OK","frase":"Porta Ok"}},{"motivo":{"name":"QUEDA","motivo":"Quedas"},"conclusao":{"nome":"PORTA_OK","frase":"Porta Ok"}},{"motivo":{"name":"RUIDO","motivo":"Ruído/Chiado"},"conclusao":{"nome":"PORTA_OK","frase":"Porta Ok"}},{"motivo":{"name":"SEMNAVEG","motivo":"Não Navega"},"conclusao":{"nome":"PORTA_OK","frase":"Porta Ok"}},{"motivo":{"name":"NAO_ATINGE","motivo":"Não Atinge Velocidade"},"conclusao":{"nome":"PORTA_NOK","frase":"Porta com Defeito"}}],"manobrar":true,"conclusao":{"motivo":{"name":"NAO_ATINGE","motivo":"Não Atinge Velocidade"},"conclusao":{"nome":"PORTA_NOK","frase":"Porta com Defeito"}}}');
    }

    public getValidacao(cadastro: Customer): Promise<Fulltest> {
        delete cadastro.servicos.origem; // Retirar futuro...
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: any, executor: string };
        _data = { cust: cadastro, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/manobra/",
            path: "NotImplemented",
            _data: _data,
            otherUrl: this.urlService.otherUrlMake(true),
            timeout: 120000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(data => {
                return data as Fulltest
            })
            .catch(super.handleError);
    }

    public getValidacaoMock(): Fulltest {
        return JSON.parse('{"id":null,"resultado":true,"dataInicio":1519912775968,"dataFim":1519912790640,"mensagem":"Não foram identificados problemas de configuração.","cl":{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1519068076539},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1519068076539},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1519068076539}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1185,"svlan":74,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Cliente sem VoIP.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV Híbrida/IPTV.","resultado":true,"foiCorrigido":false,"result":null}]}');
    }

    public getValidacaoAsserts(cadastro: Customer, ordem: string): Observable<any> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let _data: { cust: Customer, workOrderId: string, executor: string };
        _data = { cust: cadastro, workOrderId: ordem, executor: usr.user };
        let infoResquests: InfoRequest[];
        infoResquests = [
            {
                _data: cadastro,
                command: this.urlService.urlNSixtySeven + this.urlService.pathFulltestAPI + "manobra/asserts",
                timeout: 120000
            }, {
                _data: _data,
                command: this.urlService.urlNProd + this.urlService.pathStealerAPI + "manobra/asserts",
                timeout: 120000
            }
        ];
        return this.urlService
            .postJoin(infoResquests)
            .map(resposta => {
                return resposta;
            });
    }

    public getValidacaoAssertsMock(): Assert[] {
        return JSON.parse('[{"asserts":"IS_REPARO","value":true,"creationDate":1519914982606},{"asserts":"AUTH_ABERTURA_ORDEM","value":true,"creationDate":1519914982802},{"asserts":"HAS_SYNC","value":true,"creationDate":1519914943005},{"asserts":"REDE_CONFIAVEL","value":true,"creationDate":1519914943005},{"asserts":"RESYNC_MENOR_300","value":true,"creationDate":1519914943005},{"asserts":"RESYNC_MENOR_50","value":true,"creationDate":1519914943005},{"asserts":"RESYNC_MENOR_5","value":true,"creationDate":1519914943005},{"asserts":"PACOTES_DOWN_MAIOR_6000","value":true,"creationDate":1519914943005},{"asserts":"PACOTES_UP_MAIOR_4000","value":true,"creationDate":1519914943005},{"asserts":"ATT_DOWN_OK","value":false,"creationDate":1519914943005},{"asserts":"ATT_UP_OK","value":false,"creationDate":1519914943005},{"asserts":"IS_SIP","value":false,"creationDate":1519914943005}]');
    }


}
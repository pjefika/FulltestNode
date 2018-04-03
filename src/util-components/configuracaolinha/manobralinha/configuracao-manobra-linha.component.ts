import { Component, OnInit } from '@angular/core';
import { ConfiguracaoManobraLinhaService } from './configuracao-manobra-linha.service';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { ConfiguracoesGeraisLinhaService } from '../services/configuracoes-gerais-linha.service';
import { Linha } from '../../../viewmodel/cadastro/linha';
import { ConfiguracaoLinhaTdmService } from '../linha-tdm/configuracao-linha-tdm.service';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { ConfLensLivres } from '../../../viewmodel/linha/lens-livres/confLensLivres';
import { Len } from '../../../viewmodel/linha/len';
import { ConfiguracaoLinhaComponent } from '../configuracao-linha.component';
import { DynamicRouterService } from '../../dynamicrouter/dynamic-router.service';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-manobra-linha-component',
    templateUrl: 'configuracao-manobra-linha.component.html',
    styleUrls: ['configuracao-manobra-linha.component.css'],
    providers: [ConfiguracaoManobraLinhaService, ConfiguracoesGeraisLinhaService, ConfiguracaoLinhaTdmService]
})

export class ConfiguracaoManobraLinhaComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private instanciaBinada: string;

    private linhaBinada: Linha;
    private cadastroBinado: CadastroLinha;

    private listaLensLivres: ConfLensLivres;

    private btnConsultaName: string = "Consultar";

    private btnManobrarName: string = "Manobrar";
    private btnManobrarDisable: boolean = false;

    private qualLen: Len;

    constructor(private configuracaoManobraLinhaService: ConfiguracaoManobraLinhaService,
        private configuracoesGeraisLinhaService: ConfiguracoesGeraisLinhaService,
        private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    private getLinhaBinada() {
        let resptrue: boolean = false;
        this.isLoading = true;
        this.btnConsultaName = "Consultando Instância Binada.";
        if (this.instanciaBinada) {
            this.configuracoesGeraisLinhaService
                .getLinha(this.instanciaBinada)
                .then(resposta => {
                    this.linhaBinada = resposta;
                    resptrue = true;
                }, erro => {
                    super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
                    this.finishSearch();
                })
                .then(() => {
                    if (resptrue) {
                        this.getConfBinada();
                    }
                });
        } else {
            this.finishSearch();
            super.callToasty("Alerta", "Insira a instância para consultar.", "warning", 5000);
        }
    }

    private getConfBinada() {
        let resptrue: boolean = false;
        this.btnConsultaName = "Consultando Conf. da Instância Binada.";
        this.configuracaoLinhaTdmService
            .getInformacoes(this.linhaBinada)
            .then(resposta => {
                this.cadastroBinado = resposta;
                resptrue = true;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError + " / " + "Houve algum problema ao buscar informações da instância binada", "error", 5000);
                this.finishSearch();
            })
            .then(() => {
                if (resptrue) {
                    this.getLensLivres();
                }
            });
    }

    private getLensLivres() {
        this.btnConsultaName = "Consultando Len's Livres.";
        this.configuracoesGeraisLinhaService
            .getLensLivres(this.linhaBinada)
            .then(resposta => {
                this.listaLensLivres = resposta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.finishSearch();
            });
    }

    private finishSearch() {
        this.isLoading = false;
        this.btnConsultaName = "Consultar";
    }

    private setManobrarLinha() {
        if (this.qualLen) {
            this.btnManobrarName = "Manobrando Linha, Aguarde...";
            this.btnManobrarDisable = true;
            this.configuracaoManobraLinhaService
                .setManobrarLinha(this.variavelHolderService.cadastro.linha, this.qualLen, this.cadastroBinado)
                .then(resposta => {
                    this.variavelHolderService.cadastroLinha = resposta;
                    super.callToasty("Sucesso", "Linha manobrada com sucesso.", "success", 5000);
                    this.dynamicRouterService.component = ConfiguracaoLinhaComponent;
                }, erro => {
                    super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
                })
                .then(() => {
                    this.btnManobrarName = "Manobrar";
                    this.btnManobrarDisable = false;
                });
        } else {
            super.callToasty("Alerta", "Selecione o Len Livre", "warning", 5000);
        }
    }

}
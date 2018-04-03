import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ConfiguracaoLinhaCreateDeleteService } from '../configuracao-linha-create-delete.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { Linha } from '../../../../viewmodel/cadastro/linha';
import { CadastroLinha } from '../../../../viewmodel/linha/cadlinha';
import { ConfLensLivres } from '../../../../viewmodel/linha/lens-livres/confLensLivres';
import { Len } from '../../../../viewmodel/linha/len';
import { ConfiguracoesGeraisLinhaService } from '../../services/configuracoes-gerais-linha.service';
import { ConfiguracaoLinhaTdmService } from '../../linha-tdm/configuracao-linha-tdm.service';
import { ConfiguracaoLinhaComponent } from '../../configuracao-linha.component';
import { DynamicRouterService } from '../../../dynamicrouter/dynamic-router.service';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'linha-create-component',
    templateUrl: 'linha-create.component.html',
    styleUrls: ['linha-create.component.css'],
    providers: [ConfiguracaoLinhaCreateDeleteService, ConfiguracoesGeraisLinhaService, ConfiguracaoLinhaTdmService]
})

export class LinhaCreateComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private instanciaBinada: string;

    private linhaBinada: Linha;
    private cadastroBinado: CadastroLinha;

    private listaLensLivres: ConfLensLivres;

    private btnConsultaName: string = "Consultar";

    private btnCriarName: string = "Criar Linha";
    private btnCriarDisable: boolean = false;

    private qualLen: Len;

    constructor(private configuracaoLinhaCreateDeleteService: ConfiguracaoLinhaCreateDeleteService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService,
        private configuracoesGeraisLinhaService: ConfiguracoesGeraisLinhaService,
        private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService) {
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

    private createLinha() {
        if (this.qualLen) {
            this.btnCriarName = "Criando Linha, Aguarde...";
            this.btnCriarDisable = true;
            this.configuracaoLinhaCreateDeleteService
                .setCriarLinha(this.variavelHolderService.cadastro.linha, this.qualLen, this.cadastroBinado)
                .then(resposta => {
                    this.variavelHolderService.cadastroLinha = resposta;
                    if (resposta.status === "CREATED") {
                        super.callToasty("Sucesso", "Linha criada com sucesso.", "success", 5000);
                        this.dynamicRouterService.component = ConfiguracaoLinhaComponent;
                        this.systemHolderService.liberarSideNav = true;
                    }
                }, erro => {
                    super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
                })
                .then(() => {
                    this.btnCriarName = "Criar Linha";
                    this.btnCriarDisable = false;
                });
        }
    }

}
import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaTdmService } from './configuracao-linha-tdm.service';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { CadastroLinha } from '../../../viewmodel/linha/cadlinha';
import { DynamicRouterService } from '../../dynamicrouter/dynamic-router.service';
import { LinhaCreateComponent } from '../linhacreatedelete/create/linha-create.component';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-linha-tdm-component',
    templateUrl: 'configuracao-linha-tdm.component.html',
    styleUrls: ['configuracao-linha-tdm.component.css'],
    providers: [ConfiguracaoLinhaTdmService]
})

export class ConfiguracaoLinhaTdmComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private cadastroLinha: CadastroLinha;

    private editarInfoLinhas: boolean = false;

    private btnGetInformacoesDisabled: boolean = true;

    constructor(private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        super.enabledisablesidenav(true);
        this.doGetInformacoes();
    }

    public doGetInformacoes(reload?: boolean) {
        if (!this.variavelHolderService.cadastroLinha || reload) {
            if (this.systemHolderService.ableMock) {
                this.getInformacoesMock();
            } else {
                this.getInformacoes();
            }
        } else {
            this.cadastroLinha = this.variavelHolderService.cadastroLinha;
        }
    }

    private getInformacoes() {
        this.isLoading = true;
        this.btnGetInformacoesDisabled = false;
        this.configuracaoLinhaTdmService
            .getInformacoes(this.variavelHolderService.cadastro.linha)
            .then(resposta => {
                this.cadastroLinha = resposta;
                this.variavelHolderService.cadastroLinha = resposta;
                if (this.cadastroLinha.status === "NOT_CREATED") {
                    super.callToasty("Alerta", "Linha não esta criada por favor realize a configuração da mesma.", "warning", 5000);
                    this.dynamicRouterService.component = LinhaCreateComponent;
                } else {
                    this.systemHolderService.liberarSideNav = true;
                }
            }, erro => {
                if (erro.mError === "Linha não pertence a Central." && this.variavelHolderService.cadastro.instancia === this.variavelHolderService.cadastroLinha.dn) {
                    super.callToasty("Ops, aconteceu algo.", "Necessário associação de número de equipamento.", "error", 5000);
                } else {
                    super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
                }
            })
            .then(() => {
                this.isLoading = false;
                this.btnGetInformacoesDisabled = true;
            });
    }

    private getInformacoesMock() {
        this.isLoading = true;
        this.btnGetInformacoesDisabled = false;
        setTimeout(() => {
            this.cadastroLinha = this.configuracaoLinhaTdmService.getInformacoesMock();
            this.variavelHolderService.cadastroLinha = this.configuracaoLinhaTdmService.getInformacoesMock();
            this.systemHolderService.liberarSideNav = true;
            this.isLoading = false;
            this.btnGetInformacoesDisabled = true;
        }, 1000);
    }

    public abilitaEditar() {
        if (this.editarInfoLinhas) {
            this.editarInfoLinhas = false;
            this.cadastroLinha = this.variavelHolderService.cadastroLinha;
        } else {
            this.editarInfoLinhas = true;
        }
    }

}
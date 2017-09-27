import { LinhaComponent } from './actions/linha/linha.component';
import { HolderCompsService } from './../../util/component-holder/services/holder-comps.service';
import { LinhaResetDePortaService } from './general-services/linha-reset-de-porta.service';
import { ServicoLinhaService } from './actions/servico/servico-linha.service';
import { NcosService } from './actions/ncos/ncos.service';
import { CadastroLinha } from './../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../viewmodel/cadastro/linha';
import { BrancoComponent } from './../../branco/branco.component';
import { AgrupamentoComponent } from './actions/agrupamento/agrupamento.component';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css'],
    providers: [ConfiguracaoLinhaService, NcosService, ServicoLinhaService, LinhaResetDePortaService]
})

export class ConfiguracaoLinhaComponent implements OnInit {

    public cadastroLinha: CadastroLinha;
    public searching: boolean = false;
    public searchingWhat: string;

    private componentData = null;

    private editarInfoLinhas: boolean = false;

    private nomebotaoresetar: string = "Resetar porta";
    private disablebotaoresetar: boolean = false;

    private disablebtnbuscainformacao: boolean = false;

    constructor(
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService,
        private ncosService: NcosService,
        private servicoLinhaService: ServicoLinhaService,
        private linhaResetDePortaService: LinhaResetDePortaService,
        private holderCompsService: HolderCompsService) { }

    ngOnInit() {
        if (this.holderService.cadastroLinha) {
            this.cadastroLinha = this.holderService.cadastroLinha
        } else {
            this.getInformacoes();
        }
        this.getncoseservicos();
    }

    private getInformacoes() {
        this.searching = true;
        this.searchingWhat = "Buscando Informações de Linha..."
        this.configuracaoLinhaService.getInformacoes(this.holderService.cadastro.linha)
            .then(data => {
                this.cadastroLinha = data;
                this.holderService.cadastroLinha = this.cadastroLinha;
                this.holderService.liberarSideNav = true;
                this.searching = false;
                if (this.cadastroLinha.status == "NOT_CREATED") {
                    this.callToasty("Linha não configurada", "Por favor realize a configuração da linha!", "warning", 15000);
                    this.goToCreateLinhaComponent();
                }
            }, error => {
                this.searching = false;
                if (error.mError === "Linha não pertence a Central." && this.holderService.cadastro.instancia === this.holderService.cadastroLinha.dn) {
                    this.callToasty("Ops, aconteceu algo.", "Necessário associação de número de equipamento.", "error", 5000);
                } else {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                }
            });
    }

    private goToCreateLinhaComponent() {
        this.holderCompsService.component = LinhaComponent;
    }

    public getNcos() {
        this.ncosService.getNcos()
            .then(data => {
                this.holderService.listaDeNcos = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
    }

    public getServicos() {
        this.servicoLinhaService.getServicos()
            .then(data => {
                this.holderService.listaDeServicos = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
    }

    public resetarPorta() {
        this.nomebotaoresetar = "Resetando a porta";
        this.disablebotaoresetar = true;
        this.linhaResetDePortaService.resetarPorta(this.holderService.cadastro.linha)
            .then(data => {
                this.holderService.cadastroLinha = data;
                this.cadastroLinha = data;
                this.nomebotaoresetar = "Resetar porta";
                this.disablebotaoresetar = false;
            }, error => {
                this.nomebotaoresetar = "Resetar porta";
                this.disablebotaoresetar = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
    }

    public abilitaEditar() {
        if (this.editarInfoLinhas) {
            this.editarInfoLinhas = false;
            this.cadastroLinha = this.holderService.cadastroLinha;
        } else {
            this.editarInfoLinhas = true;
        }
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    public getncoseservicos() {
        if (!this.holderService.listaDeNcos) {
            // Se lista de ncos estiver vazia realiza a busca
            this.getNcos();
        }
        if (!this.holderService.listaDeServicos) {
            // Se lista de serviços estiver vazia realiza busca
            this.getServicos();
        }
    }
}
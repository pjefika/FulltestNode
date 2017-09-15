import { LinhaResetDePortaService } from './general-services/linha-reset-de-porta.service';
import { ServicoLinhaService } from './actions/servico/servico-linha.service';
import { NcosService } from './actions/ncos/ncos.service';
import { TemplateComponent } from './../../template/template.component';
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

    constructor(
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService,
        private templateComponent: TemplateComponent,
        private ncosService: NcosService,
        private servicoLinhaService: ServicoLinhaService,
        private linhaResetDePortaService: LinhaResetDePortaService) { }

    ngOnInit() {
        if (this.holderService.cadastroLinha) {
            this.cadastroLinha = this.holderService.cadastroLinha
        } else {
            this.getInformacoes();
        }
        if (!this.holderService.listaDeNcos) {
            // Se lista de ncos estiver vazia realiza a busca
            this.getNcos();
        }
        if (!this.holderService.listaDeServicos) {
            // Se lista de serviços estiver vazia realiza busca
            this.getServicos();
        }
    }

    private getInformacoes() {
        this.searching = true;
        this.searchingWhat = "Buscando Informações de Linha..."
        this.configuracaoLinhaService.getInformacoes(this.holderService.cadastro.linha)
            .then(data => {
                this.cadastroLinha = data;
                if (this.cadastroLinha.status == "NOT_CREATED") {
                    this.callToasty("Linha não configurada", "Por favor realize a configuração da linha!", "warning", 0);
                    this.goToCreateLinhaComponent();
                }
                this.holderService.cadastroLinha = this.cadastroLinha;
                this.holderService.liberarSideNav = true;
                this.searching = false;
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 25000);
            });
    }

    private goToCreateLinhaComponent() {
        this.templateComponent.createLinhaComponent();
    }

    public getNcos() {
        this.ncosService.getNcos()
            .then(data => {
                this.holderService.listaDeNcos = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public getServicos() {
        this.servicoLinhaService.getServicos()
            .then(data => {
                this.holderService.listaDeServicos = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public resetarPorta() {
        this.linhaResetDePortaService.resetarPorta(this.holderService.cadastro.linha)
            .then(data => {
                this.holderService.cadastroLinha = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.addToasty();
    }

}
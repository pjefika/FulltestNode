import { AgrupamentoComponent } from './actions/agrupamento/agrupamento.component';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css'],
    providers: [ConfiguracaoLinhaService]
})

export class ConfiguracaoLinhaComponent implements OnInit {

    public infoLinha: InfoLinha;
    public searching: boolean = false;
    public searchingWhat: string;
    public componentDataConfLine = null;

    constructor(
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) { }

    ngOnInit() {
        this.searching = true;
        this.searchingWhat = "Buscando Informações da Instância..."
        setTimeout(() => {
            this.searching = false;
            this.holderService.liberarSideNav = true;
            this.getInformacoes();
        }, 2000);
    }

    private getInformacoes() {
        this.infoLinha = this.configuracaoLinhaService.getInformacoes();
    }

    private callToasty(titulo: string, msg: string, theme: string) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.addToasty();
    }

    public createAgrupamentoComponent() {
        this.componentDataConfLine = {
            component: AgrupamentoComponent,
            inputs: {
                infoLinha: this.infoLinha
            }
        }
    }

}
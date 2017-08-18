import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    styleUrls: ['configuracao-linha.component.css']
})

export class ConfiguracaoLinhaComponent implements OnInit {

    public listaDeComandos: string[];
    public infoLinha: InfoLinha;
    public comandoSelecionado: string;
    public searching: boolean = false;
    public searchingWhat: string;

    constructor(
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) { }

    ngOnInit() {
        this.searching = true;
        this.searchingWhat = "Buscando Informações da Instância..."
        setTimeout(() => {
            this.searching = false;
            this.getLstComandos();
            this.getInformacoes();
        }, 2000);
    }

    private getLstComandos() {
        this.listaDeComandos = this.configuracaoLinhaService.getLstComandos();
    }

    private getInformacoes() {
        this.infoLinha = this.configuracaoLinhaService.getInformacoes();
    }

    private doAction() {
        if (this.comandoSelecionado) {
            this.searching = true;
            this.searchingWhat = "Executando Comando: " + this.comandoSelecionado;
            setTimeout(() => {
                this.searching = false;
                this.callToasty("Sucesso", "Comando " + this.comandoSelecionado + " executado com sucesso.", "success");
            }, 2000);
        } else {
            this.callToasty("Ops, ocorreu um erro.", "Por favor selecione um comando.", "error");
        }
    }

    callToasty(titulo: string, msg: string, theme: string) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.addToasty();
    }

}
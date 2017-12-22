import { ConfPorta } from './../../../viewmodel/confPorta/confPorta';
import { ToastyComponent } from './../../toasty/toasty.component';
import { HolderService } from './../../holder/holder.service';
import { ConfiguracoesPortaService } from './configuracoesporta.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracoes-porta-component',
    templateUrl: 'configuracoesporta.component.html',
    styleUrls: ['configuracoesporta.component.css'],
    providers: [ConfiguracoesPortaService]
})

export class ConfiguracoesPortaComponent implements OnInit {

    private searchConfPorta: boolean = false;
    private searchWhat: string;
    public confPorta: ConfPorta;

    constructor(
        private holderService: HolderService,
        private configuracoesPortaService: ConfiguracoesPortaService,
        private toastyComponent: ToastyComponent) { }

    public ngOnInit() {
        if (!this.holderService.confPorta) {
            this.getConfigPorta();
        }
        // this.holderService.resumoInfosAtivo = true;
        this.holderService.btnResumoInfosAtivo = true;
    }

    public getConfigPorta() {
        this.holderService.confPorta = null;
        this.searchConfPorta = true;
        this.searchWhat = "Buscando Informações...";

        //Deletado arvore... retirar depois...
        // delete this.holderService.cadastro.radius;
        // delete this.holderService.cadastro.eventos;

        this.configuracoesPortaService.getConfigPorta(this.holderService.cadastro)
            .then(data => {
                this.holderService.confPorta = data;
                this.searchConfPorta = false;
            }, error => {
                this.searchConfPorta = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
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

}
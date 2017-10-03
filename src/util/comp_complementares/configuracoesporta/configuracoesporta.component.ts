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

    private searchFulltest: boolean = false;
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
    }

    public getConfigPorta() {
        this.searchFulltest = true;
        this.searchWhat = "Buscando informações";
        this.configuracoesPortaService.getConfigPorta(this.holderService.cadastro)
            .then(data => {
                this.holderService.confPorta = data;
                this.searchFulltest = false;
            }, error => {
                this.searchFulltest = false;
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
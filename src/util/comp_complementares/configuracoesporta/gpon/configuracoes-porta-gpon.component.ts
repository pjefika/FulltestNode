import { ToastyComponent } from './../../../toasty/toasty.component';
import { ConfiguracoesPortaService } from './../configuracoesporta.service';
import { HolderService } from './../../../holder/holder.service';
import { ConfPorta } from './../../../../viewmodel/confPorta/confPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'configuracoes-porta-gpon-component',
    templateUrl: 'configuracoes-porta-gpon.component.html',
    styleUrls: ['configuracoes-porta-gpon.component.css']
})

export class ConfiguracoesPortaGponComponent implements OnInit {

    private searchConfPorta: boolean = false;
    private searchWhat: string;

    constructor(
        private holderService: HolderService,
        private configuracoesPortaService: ConfiguracoesPortaService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    public getConfigPorta() {
        this.searchConfPorta = true;
        this.searchWhat = "Buscando Informações...";
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
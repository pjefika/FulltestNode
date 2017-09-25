import { ToastyComponent } from './../toasty/toasty.component';
import { HolderCompsService } from './../component-holder/services/holder-comps.service';
import { FulltestComponent } from './../../co/fulltest/fulltest.component';
import { CadastroCrmComponent } from './../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { ConfiguracaoLinhaComponent } from './../../co/configuracao-linha/configuracao-linha.component';
import { ManobraComponent } from './../../co/manobra/manobra.component';
import { CadastroComponent } from './../../co/cadastro/cadastro.component';
import { SubNav } from './../../viewmodel/menus/subnav';
import { HolderService } from './../holder/holder.service';
import { TemplateComponent } from './../../template/template.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent implements OnInit {

    constructor(
        private templateComponent: TemplateComponent,
        public holderService: HolderService,
        private holderCompsService: HolderCompsService,
        private toastyComponent: ToastyComponent) { }

    @Input() menus: SubNav[];

    ngOnInit() { }

    abrecomponent(l) {
        if (this.holderService.liberarSubNav) {
            this.switchCO(l);
            this.switchCrm(l);
        }
    }

    switchCO(l) {
        switch (l.component) {
            case FulltestComponent:
                this.templateComponent.createRealizaFulltestComponent();
                break;
            case CadastroComponent:
                this.templateComponent.createCadastroComponent();
                break;
            case ManobraComponent:
                this.templateComponent.createManobraComponent();
                break;
            case ConfiguracaoLinhaComponent:
                if (this.holderService.cadastro.linha.tipo != "TDM") {
                    this.callToasty("Ops, aconteceu algo.", "Funcionalidade Indisponivel para este tipo de central.", "error", 6000);
                } else {
                    this.templateComponent.createConfiguracaoLinhaComponent();
                }
                break;
        }
    }

    switchCrm(l) {
        switch (l.component) {
            case CadastroCrmComponent:
                this.templateComponent.createRealizaFulltestCrmComponent();
                break;
            case "link-acs":
                this.templateComponent.createGoToAcsLink();
                break;
        }
    }

    subNavActive(l): Boolean {
        let active = false;
        if (l.component == this.holderCompsService.component) {
            active = true;
        }
        return active;
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
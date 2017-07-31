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
        public holderService: HolderService) { }

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
            case "full-test-component":
                this.templateComponent.createRealizaFulltestComponent();
                break;
            case "cadastro-component":
                this.templateComponent.createCadastroComponent();
                break;
            case "manobra-component":
                this.templateComponent.createManobraComponent();
                break;
        }
    }

    switchCrm(l) {
        switch (l.component) {
            case "cadastro-crm-component":
                this.templateComponent.createRealizaFulltestCrmComponent();
                break;
            case "complementares-component":
                this.templateComponent.createComplementaresComponent();
                break;
        }
    }

    subNavActive(l): Boolean {
        let active = false;
        if (l.component == this.holderService.whoSubNavIsActive) {
            active = true;
        }
        return active;
    }

}
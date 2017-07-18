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

    @Input() menus: [{ nome: string, component: string }];

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

}
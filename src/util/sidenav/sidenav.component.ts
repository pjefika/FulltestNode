import { TemplateComponent } from './../../template/template.component';
import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SidenavComponent implements OnInit {

    constructor(
        public holderService: HolderService,
        private templateComponent: TemplateComponent) { }

    @Input() menus: [{ nome: string, component: string }];

    private howSideNavIsActive: string;

    ngOnInit() { }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.howSideNavIsActive = l.component;
            this.configuracaoLinhaComponents(l);
        }
    }

    private configuracaoLinhaComponents(l) {        
        switch (l.component) {
            case "agrupamento-component":
                this.templateComponent.createAgrupamentoComponent();
                break;
            case "custgroup-component":
                this.templateComponent.createCustgroupComponent();
                break;
            case "ncos-component":
                this.templateComponent.createNcosComponent();
                break;
            case "linha-component":
                this.templateComponent.createLinhaComponent();
                break;
            case "servico-linha-component":                
                this.templateComponent.createServicoLinhaComponent();
                break;
            case "status-porta-component":
                this.templateComponent.createStatusPortaComponent();
                break;
            case "manobrar-linha-component":
                this.templateComponent.createManobrarLinhaComponent();
                break;
            case "status-linha-component":
                this.templateComponent.createStatusLinhaComponent();
                break;
        }
    }

    public sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.howSideNavIsActive) {
            active = true;
        }
        return active;
    }
}
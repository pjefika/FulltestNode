import { SideNav } from './../../viewmodel/menus/sidenav';
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

    @Input() public menus: SideNav[];
    @Input() public ativo: boolean;

    private howSideNavIsActive: string;

    ngOnInit() {
        this.howSideNavIsActive = this.holderService.whoSideNavIsActive;
    }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.holderService.whoSideNavIsActive = l.component;
            this.configuracaoLinhaComponents(l);
        }
    }

    private configuracaoLinhaComponents(l) {
        switch (l.component) {
            case "configuracao-linha-component":
                this.templateComponent.createConfiguracaoLinhaComponent();
                break;
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
        if (l.component === this.holderService.whoSideNavIsActive) {
            active = true;
        }
        return active;
    }
}
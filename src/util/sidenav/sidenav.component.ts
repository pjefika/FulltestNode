import { sideNavConfLinha } from './../../co/configuracao-linha/mock/mock-sidenav-co';
import { TemplateComponent } from './../../template/template.component';
import { HolderCompsService } from './../component-holder/services/holder-comps.service';
import { ManobrarLinhaComponent } from './../../co/configuracao-linha/actions/manobrar/manobrar-linha.component';
import { LinhaComponent } from './../../co/configuracao-linha/actions/linha/linha.component';
import { ServicoLinhaComponent } from './../../co/configuracao-linha/actions/servico/servico-linha.component';
import { ConfiguracaoLinhaComponent } from './../../co/configuracao-linha/configuracao-linha.component';
import { SideNav } from './../../viewmodel/menus/sidenav';
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
        private holderCompsService: HolderCompsService) { }

    @Input() public menus: SideNav[];
    @Input() public ativo: boolean;

    private howSideNavIsActive: string;

    ngOnInit() {
        this.howSideNavIsActive = this.holderService.whoSideNavIsActive;
    }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.configuracaoLinhaComponents(l);
            this.holderService.whoSideNavIsActive = l.component;
        }
    }

    private configuracaoLinhaComponents(l) {
        switch (l.component) {
            case ConfiguracaoLinhaComponent:
                this.holderService.sideNavMenus = sideNavConfLinha;
                this.holderService.whoSubNavIsActive = "configuracao-linha-component";
                this.holderService.whoSideNavIsActive = "configuracao-linha-component";
                this.holderCompsService.component = ConfiguracaoLinhaComponent;
                break;
            case LinhaComponent:
                this.holderService.whoSideNavIsActive = "linha-component";
                this.holderCompsService.component = LinhaComponent;
                break;
            case ServicoLinhaComponent:
                this.holderService.whoSideNavIsActive = "servico-linha-component";
                this.holderCompsService.component = ServicoLinhaComponent;
                break;
            case ManobrarLinhaComponent:
                this.holderService.whoSideNavIsActive = "manobrar-linha-component";
                this.holderCompsService.component = ManobrarLinhaComponent;
                break;
        }
    }

    public sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.holderService.whoSideNavIsActive) {
            console.log(l);
            active = true;
        }
        return active;
    }
}
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


    ngOnInit() { }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.configuracaoLinhaComponents(l);
        }
    }

    private configuracaoLinhaComponents(l) {
        switch (l.component) {
            case ConfiguracaoLinhaComponent:
                this.holderService.sideNavMenus = sideNavConfLinha;
                this.holderCompsService.component = ConfiguracaoLinhaComponent;
                break;
            case LinhaComponent:
                this.holderCompsService.component = LinhaComponent;
                break;
            case ServicoLinhaComponent:
                this.holderCompsService.component = ServicoLinhaComponent;
                break;
            case ManobrarLinhaComponent:
                this.holderCompsService.component = ManobrarLinhaComponent;
                break;
        }
    }

    public sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.holderCompsService.component) {
            active = true;
        }
        return active;
    }
}
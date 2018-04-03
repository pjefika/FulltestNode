import { Component, OnInit, Input } from '@angular/core';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { DynamicRouterService } from '../dynamicrouter/dynamic-router.service';
import { SideNavMockLinhaCO } from '../../util/mocks/sidenav/sideNavMockLinhaCo';
import { SubNav } from '../../viewmodel/subnav/subnav';
import { SubNavMockCo } from '../../util/mocks/subsnav/subNavMockCo';
import { ConfiguracaoLinhaComponent } from '../configuracaolinha/configuracao-linha.component';
import { SideNav } from '../../viewmodel/sidenav/sidenav';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SidenavComponent implements OnInit {

    @Input() public menus: SideNav[];

    constructor(public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public dynamicRouterHolderService: DynamicRouterService) { }

    public ngOnInit() {
        setTimeout(() => {
            this.validaComponenteParaMontarSideNavMock(this.systemHolderService.subNavMenus);
        }, 1);
    }

    public validaComponenteParaMontarSideNavMock(subnavs: SubNav[]) {
        subnavs.forEach(subnav => {
            if (subnav.component === this.dynamicRouterHolderService.component && subnav.haveSideNav) {
                this.switchComp(this.dynamicRouterHolderService.component);
            }
        });
    }

    private switchComp(component: any) {
        switch (component) {
            case ConfiguracaoLinhaComponent:
                if (this.variavelHolderService.cadastro.linha.tipo === "TDM") {
                    this.systemHolderService.sideNavMenus = SideNavMockLinhaCO;
                }
                break;
        }
    }

    public abrecomponent(l) {
        if (this.systemHolderService.liberarSideNav) {
            if (l.link) {
                window.open(l.link);
            } else {
                this.dynamicRouterHolderService.component = l.component;
            }
        }
    }

    public sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.dynamicRouterHolderService.component) {
            active = true;
        }
        return active;
    }

}
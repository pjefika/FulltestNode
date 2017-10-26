import { mockListSidenavCoTdm } from './../../co/configuracao-linha/tdm/mock/mock-list-sidenav-co';
import { DynamicRouterHolderService } from './../dynamic-router/dynamic-router-holder.service';
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
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    @Input() public menus: SideNav[];
    @Input() public ativo: boolean;


    public ngOnInit() {
        if (this.holderService.cadastro.linha.tipo === "TDM") {
            this.holderService.sideNavMenus = mockListSidenavCoTdm;
        }
    }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
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
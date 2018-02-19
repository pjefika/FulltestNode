import { Component, OnInit, Input } from '@angular/core';
import { SubNav } from '../../viewmodel/subnav/subnav';
import { DynamicRouterService } from '../dynamicrouter/dynamic-router.service';
import { SystemHolderService } from '../../util/holder/systemHolder.service';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent implements OnInit {

    constructor(
        public systemHolderService: SystemHolderService,
        public dynamicRouterService: DynamicRouterService) { }

    @Input() public menus: SubNav[];

    public ngOnInit() { }

    private abrecomponent(l: SubNav) {
        // this.systemHolderService.sidenav = l.haveSideNav; // Para SideNav...
        if (this.systemHolderService.liberarSubNav || l.ativo) {
            if (l.link) {
                window.open(l.link);
            } else {
                this.dynamicRouterService.component = l.component;
            }
        }
    }

    private subNavActive(l: SubNav): Boolean {
        let active = false;
        if (l.component == this.dynamicRouterService.component) {
            active = true;
        }
        return active;
    }

}
import { Component, OnInit, Input } from '@angular/core';
import { SubNav } from '../../viewmodel/subnav/subnav';
import { DynamicRouterService } from '../dynamicrouter/dynamic-router.service';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent extends SuperComponentService implements OnInit {

    constructor(
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    @Input() public menus: SubNav[];

    public ngOnInit() { }

    private abrecomponent(l: SubNav) {
        if (!this.validaSeTemSideNav(l)) {
            super.enabledisablesidenav(false);
        }
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

    private validaSeTemSideNav(l: SubNav) {
        let valid: boolean = false;
        if (l.haveSideNav) {
            valid = true;
        }
        return valid;
    }

}
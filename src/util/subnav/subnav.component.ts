import { DynamicRouterHolderService } from './../dynamic-router/dynamic-router-holder.service';
import { SubNav } from './../../viewmodel/menus/subnav';
import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent implements OnInit {

    constructor(
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    @Input() public menus: SubNav[];

    public ngOnInit() {

    }

    private abrecomponent(l) {       
        this.holderService.sidenav = false;
        if (this.holderService.liberarSubNav) {
            if (l.link) {
                window.open(l.link);
            } else {
                this.dynamicRouterHolderService.component = l.component;
            }
        }
    }

    private subNavActive(l): Boolean {
        let active = false;
        if (l.component == this.dynamicRouterHolderService.component) {
            active = true;
        }
        return active;
    }

}
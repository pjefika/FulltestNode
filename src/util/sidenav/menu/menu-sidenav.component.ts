import { SideNav } from './../../../viewmodel/menus/sidenav';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'menu-sidenav-component',
    templateUrl: 'menu-sidenav.component.html',
    styleUrls: ['menu-sidenav.component.css']
})

export class MenuSidenavComponent implements OnInit {

    @Input() menus: SideNav[];

    constructor() { }

    ngOnInit() { }

}
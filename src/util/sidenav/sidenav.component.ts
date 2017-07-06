import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SidenavComponent implements OnInit {
    constructor() { }

    @Input() menus: [{ nome: string, component: string }];

    @Input() liberarSidNav: boolean = false;

    ngOnInit() { }

    abrecomponent(l) {
        if (this.liberarSidNav) {
            switch (l.component) {
                case "":
                    
                    break;
            }
        }
    }
}
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SidenavComponent implements OnInit {
    constructor() { }

    @Input() menus: [ { nome: string, component: string } ];

    ngOnInit() { }
}
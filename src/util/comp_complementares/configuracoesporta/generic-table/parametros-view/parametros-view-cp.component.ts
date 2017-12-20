import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'parametros-view',
    templateUrl: 'parametros-view-cp.component.html',
    styleUrls: ['parametros-view-cp.component.css']
})

export class ParametrosViewCpComponent implements OnInit {

    @Input() public parametros: any;

    constructor() { }

    public ngOnInit() { }

}
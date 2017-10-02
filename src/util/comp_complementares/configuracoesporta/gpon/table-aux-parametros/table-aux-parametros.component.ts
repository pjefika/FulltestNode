import { Parametros } from './../../../../../viewmodel/confPorta/parametros';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-parametros-component',
    templateUrl: 'table-aux-parametros.component.html',
    styleUrls: ['table-aux-parametros.component.css']
})

export class TableAuxParametrosComponent implements OnInit {

    @Input() public parametros: Parametros;

    constructor() { }

    ngOnInit() {
    }
}
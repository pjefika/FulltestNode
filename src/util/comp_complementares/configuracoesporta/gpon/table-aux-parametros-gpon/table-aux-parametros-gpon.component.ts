import { Parametros } from './../../../../../viewmodel/confPorta/parametros';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-parametros-gpon',
    templateUrl: 'table-aux-parametros-gpon.component.html',
    styleUrls: ['table-aux-parametros-gpon.component.css']
})

export class TableAuxParametrosGponComponent implements OnInit {

    @Input() public parametros: Parametros;

    constructor() { }

    ngOnInit() {
    }
}
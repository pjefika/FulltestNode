import { Parametros } from './../../../../../viewmodel/confPorta/parametros';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-parametros-metalico',
    templateUrl: 'table-aux-parametros-metalico.component.html',
    styleUrls: ['table-aux-parametros-metalico.component.css']
})

export class TableAuxParametrosMetalicoComponent implements OnInit {

    @Input() public parametros: any;

    constructor() { }

    ngOnInit() {
        console.log(this.parametros)
    }
}
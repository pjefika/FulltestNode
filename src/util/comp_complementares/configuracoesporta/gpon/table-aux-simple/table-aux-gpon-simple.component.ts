import { EstadoPorta } from './../../../../../viewmodel/confPorta/estadoPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-gpon-simple-component',
    templateUrl: 'table-aux-gpon-simple.component.html',
    styleUrls: ['table-aux-gpon-simple.component.css']
})

export class TableAuxGponSimpleComponent implements OnInit {

    @Input() public estadoPorta: EstadoPorta;

    constructor() { }

    ngOnInit() { }
}
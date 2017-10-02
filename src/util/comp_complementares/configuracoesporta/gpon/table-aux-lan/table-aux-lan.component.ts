import { ConfPorta } from './../../../../../viewmodel/confPorta/confPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-lan-component',
    templateUrl: 'table-aux-lan.component.html',
    styleUrls: ['table-aux-lan.component.css']
})

export class TableAuxLanComponent implements OnInit {

    @Input() confPorta: ConfPorta;

    constructor() { }

    ngOnInit() { }
}
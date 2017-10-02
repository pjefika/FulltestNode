import { Serial } from './../../../../../viewmodel/confPorta/serial';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-serial-component',
    templateUrl: 'table-aux-serial.component.html',
    styleUrls: ['table-aux-serial.component.css']
})

export class TableAuxSerialComponent implements OnInit {

    @Input() public serial: Serial;

    constructor() { }

    ngOnInit() { }
}
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {

    @Input() public msg: any;
    @Input() public ativo: boolean = false;
    @Input() public closeable: boolean = true;

    constructor() { }

    ngOnInit() { }
}
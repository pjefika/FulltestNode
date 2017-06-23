import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {

    @Input() msg: any;
    @Input() ativo: boolean;

    constructor() { }

    ngOnInit() { }
}
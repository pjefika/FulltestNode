import { Component, OnInit } from '@angular/core';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'table-modulacao-cp-component',
    templateUrl: 'table-modulacao-cp.component.html',
    styleUrls: ['table-modulacao-cp.component.css']
})

export class TableModulacaoCpComponent extends CallAlertService implements OnInit {

    constructor(public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { }
    
}
import { ObjectValid } from './../../../viewmodel/fulltest/objectValid';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'fulltest-table-component',
    templateUrl: 'fulltest-table.component.html',
    styleUrls: ['fulltest-table.component.css']
})
//So passar ObjectValid que ira montar a tabela com as validações Fulltest
export class FulltestTableComponent extends CallAlertService implements OnInit {

    @Input() public objectValid: ObjectValid;

    @Input() public msgAtivo?: boolean = true;  

    constructor(public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        super.callAlert(true, this.objectValid.resultado ? 'alert-success' : 'alert-danger', this.objectValid.mensagem);        
    }

}
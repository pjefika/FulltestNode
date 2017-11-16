import { ObjectValid } from './../../../viewmodel/fulltest/objectValid';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fulltest-table-component',
    templateUrl: 'fulltest-table.component.html',
    styleUrls: ['fulltest-table.component.css']
})
//So passar ObjectValid que ira montar a tabela com as validações Fulltest
export class FulltestTableComponent implements OnInit {

    @Input() objectValid: ObjectValid;

    private msg: {
        alertType: string,
        msg: string
    }

    constructor() { }

    public ngOnInit() {
        this.msg = {
            alertType: this.objectValid.resultado ? 'alert-success' : 'alert-danger',
            msg: this.objectValid.mensagem
        }
    }

}
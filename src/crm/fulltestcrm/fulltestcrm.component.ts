import { ToastyComponent } from './../../util/toasty/toasty.component';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { FulltestCrmService } from './fulltestcrm.service';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'fulltest-crm-component',
    templateUrl: 'fulltestcrm.component.html',
    styleUrls: ['fulltestcrm.component.css']
})

export class FullltestCrmComponent extends CallAlertService implements OnInit {

    cadastro: Cadastro;

    @Input() objectValid: ObjectValid;

    doFulltest: boolean = false;

    searchFulltest: boolean = false;

    constructor(
        private fulltestCrmService: FulltestCrmService,
        public toastyComponent: ToastyComponent) { super(toastyComponent); }

    public ngOnInit() { }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.fulltestCrmService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
            }, error => {
                this.searchFulltest = false;
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
    }

}
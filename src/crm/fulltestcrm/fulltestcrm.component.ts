import { ToastyComponent } from './../../util/toasty/toasty.component';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { FulltestCrmService } from './fulltestcrm.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fulltest-crm-component',
    templateUrl: 'fulltestcrm.component.html',
    styleUrls: ['fulltestcrm.component.css']
})

export class FullltestCrmComponent implements OnInit {

    cadastro: Cadastro;

    @Input() objectValid: ObjectValid;

    doFulltest: boolean = false;

    searchFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private fulltestCrmService: FulltestCrmService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.fulltestCrmService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
            }, error => {
                this.searchFulltest = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}
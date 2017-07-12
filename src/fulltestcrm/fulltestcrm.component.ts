import { ToastyComponent } from './../util/toasty/toasty.component';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
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
                if (error.tError !== "Timeout") {
                    this.doFulltest = true;
                }
                this.toastyInfo = {
                    titulo: "Ops, ocorreu um erro.",
                    msg: error.mError,
                    theme: "error"
                }
                this.toastyComponent.toastyInfo = this.toastyInfo;
                this.toastyComponent.addToasty();
            })
    }

}
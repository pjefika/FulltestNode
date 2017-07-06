import { Router } from '@angular/router';
import { Util } from './../util/util';
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

export class FulltestCrmComponent implements OnInit {

    @Input() cadastro: Cadastro;
    objectValid: ObjectValid;

    searchFulltest: boolean = false;
    alertTypeOn: boolean = false;
    doFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private fulltestCrmService: FulltestCrmService,
        private toastyComponent: ToastyComponent,
        private util: Util,
        private router: Router) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        //Inicia o fulltest assim que inicializa o componente
        this.realizaFulltest();
    }

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
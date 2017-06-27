import { ToastyComponent } from './../util/toasty/toasty.component';
import { FulltestService } from './fulltest.service';
import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: "full-test-component",
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css'],
    providers: [ToastyComponent]
})

export class FulltestComponent implements OnInit {

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

    constructor(private fulltestService: FulltestService, private util: Util, private router: Router, private toastyComponent: ToastyComponent) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        //Inicia o fulltest assim que inicializa o componente
        //this.realizaFulltest();
    }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.fulltestService
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
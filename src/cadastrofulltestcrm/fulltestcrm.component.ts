import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { FulltestCrmService } from './fulltestcrm.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'fulltest-crm-component',
    templateUrl: 'fulltestcrm.component.html',
    styleUrls: ['fulltestcrm.component.css']
})

export class FulltestCrmComponent implements OnInit {

    cadastro: Cadastro;
    instancia: string;

    objectValid: ObjectValid;

    searchFulltest: boolean = false;
    alertTypeOn: boolean = false;
    doFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    searchWhat: string;

    constructor(
        private fulltestCrmService: FulltestCrmService,
        private toastyComponent: ToastyComponent,
        private util: Util,
        private router: Router,
        private injector: Injector) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        //Inicia o fulltest assim que inicializa o componente
        this.getCadastro();
    }

    getCadastro(): void {
        this.searchFulltest = true;
        this.searchWhat = "Buscando Cadastro...";
        this.fulltestCrmService
            .getCadastro(this.instancia)
            .then(data => {                
                this.cadastro = data;
                this.searchFulltest = false;
                this.realizaFulltest();
            }, error => {
                this.searchFulltest = false;
                this.toastyInfo = {
                    titulo: "Ops, ocorreu um erro.",
                    msg: error.mError,
                    theme: "error"
                }
                this.toastyComponent.toastyInfo = this.toastyInfo;
                this.toastyComponent.addToasty();
            });
    }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.searchWhat = "Realizando Fulltest...";
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
import { HolderService } from './../util/holder/holder.service';
import { TemplateComponent } from './../template/template.component';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { FulltestService } from './fulltest.service';
import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { Component, Input, OnInit, Injector } from '@angular/core';

@Component({
    selector: "full-test-component",
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css']
})

export class FulltestComponent implements OnInit {

    cadastro: Cadastro;
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
        private fulltestService: FulltestService,
        private router: Router,
        private util: Util,
        private injector: Injector,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        // Injeta o parametro input/dados passados para a variavel
        this.cadastro = this.injector.get('cadastro');
        this.objectValid = this.injector.get('valid');
    }

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
                this.holderService.objectValid = this.objectValid;
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
            });

    }
}
import { CadastroCrmService } from './cadastrocrm.service';
import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'cadastro-crm-component',
    templateUrl: 'cadastrocrm.component.html',
    styleUrls: ['cadastrocrm.component.css']
})

export class CadastroCrmComponent implements OnInit {

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
        private cadastroCrmService: CadastroCrmService,
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
        this.cadastroCrmService
            .getCadastro(this.instancia)
            .then(data => {                
                this.cadastro = data;
                this.searchFulltest = false;
                this.fazFulltest();
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

    fazFulltest(): void {
        this.cadastro.asserts.forEach(assert => {
            if (assert.asserts === "HAS_BLOQUEIO_RADIUS" && assert.value === false) {
                //Faz algo
            }
            if (assert.asserts === "DIVERGENCIA_TBS_RADIUS" && assert.value === false) {
                //Faz algo
            }
            if (assert.asserts === "CIRCUITO_ATIVO" && assert.value === true) {
                //Faz algo
            }
            
        });
    }
}
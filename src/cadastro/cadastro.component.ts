import { TemplateComponent } from './../template/template.component';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { ObjectValid } from './../viewmodel/objectValid';
import { Valids } from './../viewmodel/validacao';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import { Wizard } from "clarity-angular";

import { CadastroService } from './cadastro.service';
import { Cadastro } from '../viewmodel/cadastro';
import { Util } from '../util/util';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent implements OnInit {

    cadastro: Cadastro;

    instancia: string;
    searching: boolean = false;
    modalOpen: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    @ViewChild("wizardmodal") wizardmodal: Wizard;

    constructor(
        private cadastroService: CadastroService,
        private router: Router,
        private util: Util,
        private injector: Injector,
        private toastyComponent: ToastyComponent,
        private templateComponent: TemplateComponent) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        //Se cadastro já foi consultado e preenchido o mesmo so atribui para a variavel. 
        if (this.templateComponent.cadastro) {
            this.cadastro = this.templateComponent.cadastro;
        } else {
            this.getCadastro();
        }
    }

    getCadastro(): void {
        this.searching = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searching = false;
                this.templateComponent.cadastro = this.cadastro;
                this.templateComponent.liberarSubNav = true;
                this.templateComponent.liberarSidNav = true;
            }, error => {
                this.searching = false;
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
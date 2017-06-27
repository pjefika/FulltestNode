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
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css'],
    providers: [ToastyComponent]
})

export class CadastroComponent implements OnInit {

    @ViewChild("wizardmodal") wizardmodal: Wizard;

    constructor(private cadastroService: CadastroService, private router: Router, private util: Util, private injector: Injector, private toastyComponent: ToastyComponent) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }
    cadastro: Cadastro;

    instancia: string;
    searching: boolean = false;
    alertTypeOn: boolean = false;
    modalOpen: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.getCadastro();
    }

    getCadastro(): void {
        this.searching = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searching = false;
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
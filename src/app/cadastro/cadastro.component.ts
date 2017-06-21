import { FulltestComponent } from './fulltest.component';
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
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent implements OnInit {

    @ViewChild("wizardmodal") wizardmodal: Wizard;

    constructor(private cadastroService: CadastroService, private router: Router, private util: Util, private injector: Injector) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    cadastro: Cadastro;
    objectValid: ObjectValid;

    error: {
        message: string;
    }

    instancia: string;
    searching: boolean = false;

    searchFulltest: boolean = false; 

    alertTypeOn: boolean = false;
    informAlertType: string;
    mensagemAlert: string;

    modalOpen: boolean = false;

    doFulltest: boolean = false;

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
                this.alertTypeOn = true;
                this.searching = false;
                this.informAlertType = "alert-danger";
                this.error = error.json();
                this.mensagemAlert = this.error.message;
            });
    }
}
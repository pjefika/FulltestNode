import { ObjectValid } from './../viewmodel/objectValid';
import { Valids } from './../viewmodel/validacao';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { CadastroService } from './cadastro.service';
import { Cadastro } from '../viewmodel/cadastro';
import { Util } from '../util/util';

@Component({
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent implements OnInit {
    constructor(private cadastroService: CadastroService, private router: Router, private util: Util, private injector: Injector) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.getCadastro();
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

    reFulltest: boolean = false;

    getCadastro(): void {
        this.searching = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searching = false;
                this.realizaFulltest();
            }, error => {
                this.alertTypeOn = true;
                this.searching = false;
                this.informAlertType = "alert-danger";
                this.error = error.json();
                this.mensagemAlert = this.error.message;
                //console.log(error);
            });
    }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.reFulltest = true;
        this.cadastroService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
                this.reFulltest = false;
            }, error => {
                this.searchFulltest = false;
                this.alertTypeOn = true;
                this.informAlertType = "alert-danger";
                this.error = error.json();
                this.mensagemAlert = this.error.message;
                //console.log(error);
            })
    }

}
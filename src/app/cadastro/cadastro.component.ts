import { ObjectValid } from './../viewmodel/objectValid';
import { Valids } from './../viewmodel/validacao';
import { Component, OnInit } from '@angular/core';
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
    constructor(private cadastroService: CadastroService, private router: Router, private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if(!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        })
    }
    /*
    Instâncias : 3125211148 // 4131543457
     */

    cadastro: Cadastro;
    objectValid: ObjectValid;

    instancia: string = "3125211148";
    searching: boolean = false;

    modalFulltest: boolean = false;
    searchFulltest: boolean = false;

    alertTypeOn: boolean = false;
    informAlertType: string;
    mensagemAlert: string;    

    getCadastro(): void {
        this.searching = true;
        this.cadastroService
        .getCadastro(this.instancia)
        .then(
            data => {                
                this.cadastro = data;
                this.searching = false;
            },
            error => {
                this.alertTypeOn = true;
                this.informAlertType = "alert-warning";
                this.mensagemAlert = ""                
                console.log(error);
            });
    }

    realizaFulltest(): void {
        this.modalFulltest = true;
        this.searchFulltest = true;
        this.cadastroService
        .getValidacao(this.cadastro)
        .then(
            data => {
                this.objectValid = data;
                this.searchFulltest = false;
            },
            error => {
                this.alertTypeOn = true;
                this.informAlertType = "alert-warning";
                this.mensagemAlert = ""                
                console.log(error);
            }
        )
    }

}
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

    cadastro: Cadastro;
    instancia: string = "4131543457";
    searching: boolean = false;

    getCadastro(): void {        

        this.searching = true;
        this.cadastroService
        .getCadastro(this.instancia)
        .then(
            data => {                
                this.cadastro = data
                this.searching = false;
                //console.log(this.cadastro);
            },
            error => {
                console.log("erro");
            });
    }

}
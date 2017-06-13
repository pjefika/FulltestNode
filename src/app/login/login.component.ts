import { Component, OnInit } from '@angular/core';

import { Usuario } from '../viewmodel/usuario';

import { Router } from '@angular/router';

import { CadastroComponent } from '../cadastro/cadastro.component';

import { Util } from '../util/util';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    usuario = new Usuario();
    erroLogar: boolean = false;

    constructor(private router: Router, private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.router.navigate(['./fulltest/inicio']);
            }
        })
    }

    entrar(): void {
        if (this.usuario.login && this.usuario.senha) {
            //insere na session o login do usuario.
            sessionStorage.setItem('user', this.usuario.login);

            // console.log("Usuário: " + this.usuario.login);
            // console.log("Senha: " + this.usuario.senha);

            //colocar validação se login ok ir para \/
            this.router.navigate(['./fulltest/inicio']);
        } else {
            this.erroLogar = true;
        }
    }   

}
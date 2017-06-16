import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Util } from '../util/util';

import { Usuario } from '../viewmodel/usuario';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    usuario = new Usuario();
    erroLogar: boolean = false;

    constructor(private router: Router, private util: Util, private loginService: LoginService) { }

    ngOnInit(): void {
        this.usuario.login = "G0034481";
        this.usuario.senha = "Ab010203";

        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.router.navigate(['./fulltest/']);
            }
        })
    }

    consultar(): void {
        this.loginService
            .getUsuario(this.usuario)
            .then(data => {
                if (data) {
                    sessionStorage.setItem('user', this.usuario.login);
                    this.router.navigate(['./fulltest/']);
                } else {
                    this.erroLogar = true;
                    console.log("erro[2]");
                }
            }, error => {
                console.log("erro[1]");
            });
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
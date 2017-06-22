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
    erroMensagem: string;

    constructor(private router: Router, private util: Util, private loginService: LoginService) { }

    ngOnInit(): void {
        this.usuario.login;
        this.usuario.senha;

        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.router.navigate(['./fulltest/']);
            }
        })
    }

    entrar(): void {
        this.loginService
            .getUsuario(this.usuario)
            .then(data => {
                if (data) {
                    sessionStorage.setItem('user', this.usuario.login);
                    this.router.navigate(['./fulltest/']);
                } else {
                    this.erroLogar = true;
                    this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
                    this.usuario.senha = "";
                }
            }, error => {
                this.erroLogar = true;
                this.erroMensagem = error.mError
            });
    }

}
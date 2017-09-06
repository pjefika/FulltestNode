import { Md5 } from 'ts-md5/dist/md5';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { Util } from '../util/util';

import { Usuario } from '../viewmodel/usuario';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    usuario = new Usuario();
    logando: boolean = false;
    erroLogar: boolean = false;
    erroMensagem: string;

    constructor(private router: Router, private util: Util, private loginService: LoginService) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.router.navigate(['./']);
            }
        })
    }

    entrar(): void {
        this.logando = true;
        this.loginService
            .autentica(this.usuario)
            .then(data => {
                if (data) {
                    this.loginService
                        .getUsuario(this.usuario)
                        .then(data => {
                            this.usuario = data;
                            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
                            this.router.navigate(['./']);
                        });
                } else {
                    this.erroLogar = true;
                    this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
                    this.usuario.senha = "";
                }
                this.logando = false;
            }, error => {
                this.usuario.login = ""
                this.usuario.senha = ""
                this.erroLogar = true;
                this.erroMensagem = error.mError
                this.logando = false;
            });
    }

}
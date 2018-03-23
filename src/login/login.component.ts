import { Component, OnInit } from '@angular/core';
import { Usuario } from '../viewmodel/usuario/usuario';
import { UtilService } from '../util/util.service';
import { LoginService } from './login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AlertService } from '../util/alert/alert.service';
import { ToastyComponent } from '../util-components/toasty/toasty.component';
import { SystemHolderService } from '../util/holder/systemHolder.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService]
})

export class LoginComponent extends AlertService implements OnInit {

    private usuario = new Usuario();
    private logando: boolean = false;

    constructor(public util: UtilService,
        private loginService: LoginService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (result) {
                this.util.navigate('./');
            }
        });
    }

    private validRememberMe() {



    }

    private doEntrar() {
        if (this.systemHolderService.ableMock) {
            this.entrarMock();
        } else {
            this.entrar();
        }
    }

    private entrar() {
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
                            this.util.navigate('./');
                        });
                } else {
                    //type: "warning", msg: "Usuário ou senha incorretos, por favor verifique."
                    super.callAlert("warning", "Usuário ou senha incorretos, por favor verifique.");
                    this.usuario.senha = "";
                }
                this.logando = false;
            }, error => {
                this.usuario.login = "";
                this.usuario.senha = "";
                super.callAlert("error", "Usuário ou senha incorretos, por favor verifique.");
                this.logando = false;
            });
    }

    private entrarMock() {
        this.logando = true;
        setTimeout(() => {
            this.usuario = this.loginService.getUsuarioMock();
            sessionStorage.setItem('user', JSON.stringify({ user: this.usuario.login, nv: this.usuario.nivel, token: Md5.hashStr("fulltest-app") }));
            this.util.navigate('./');
            this.logando = false;
        }, 1000);


    }

}
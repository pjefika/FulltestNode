import { PrincipalComponent } from './../principal/principal.component';
import { CadastroComponent } from './../cadastro/cadastro.component';
import { Util } from './../util/util';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-full',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    // Instância: ** 3125211148 ** 6235845854

    componentData = null;
    instancia: string = "";
    btnBuscaCadastro: boolean = false;

    constructor(private router: Router, private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.createPrincipalComponen();
    }

    sair(): void {
        sessionStorage.clear();
        this.router.navigate(['./fulltest/entrar']);
    }

    createPrincipalComponen() {
        this.componentData = {
            component: PrincipalComponent,
            inputs: {
                nothing: 1
            }
        }
    }

    createCadastroComponent() {
        this.btnBuscaCadastro = true;
        this.componentData = {
            component: CadastroComponent,
            inputs: {
                instancia: this.instancia
            }
        }
    }
}
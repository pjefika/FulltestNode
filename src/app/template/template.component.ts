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

    // Instância: ** 3125211148

    componentData = null;
    instancia: string = "3125211148";
    btnBuscaCadastro: boolean = false;

    constructor(private router: Router, private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }

    sair(): void {
        sessionStorage.clear();
        this.router.navigate(['./fulltest/entrar']);
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
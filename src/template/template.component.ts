import { Cadastro } from './../viewmodel/cadastro';
import { FulltestComponent } from './../fulltest/fulltest.component';
import { sideNavMockCadastro } from './mock/cadastro/mock-sidenav-cadastro';
import { subNavMockCadastro } from './mock/cadastro/mock-subnav-cadastro';
import { CadastroComponent } from './../cadastro/cadastro.component';
import { PrincipalComponent } from './../principal/principal.component';
import { sideNavMockMassivo } from './mock/massivo/mock-sidenav-massivo';
import { subNavMockMassivo } from './mock/massivo/mock-subnav-massivo';
import { SideNav } from './../viewmodel/sidenav';
import { SubNav } from './../viewmodel/subnav';
import { Util } from './../util/util';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-full',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    buscaCadastro: boolean = false;
    nav: boolean = false;

    instancia: string = "";

    subNavMenus: SubNav[];
    sideNavMenus: SideNav[];

    componentData = null;

    cadastro: Cadastro;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private router: Router,
        private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.createPrincipalComponent();
    }

    /**
    * Sair do sistema
    **/
    sair(): void {
        sessionStorage.clear();
        this.router.navigate(['./fulltest/entrar']);
    }

    /**
    * Ação para busca da instância
    **/
    busca() {
        this.nav = true;
        this.subNavMenus = subNavMockCadastro;
        this.sideNavMenus = sideNavMockCadastro;
        this.createCadastroComponent();
    }

    /**
    * Ações do header-nav
    **/
    cadastroClick() {
        this.buscaCadastro = true;
        this.nav = false;
        this.subNavMenus = null;
        this.sideNavMenus = null;
    }

    massivoClick() {
        this.nav = true;
        this.buscaCadastro = false;
        this.subNavMenus = subNavMockMassivo;
        this.sideNavMenus = sideNavMockMassivo;
    }

    /**
    * Insere components no dynamic component
    **/
    createPrincipalComponent() {
        this.componentData = {
            component: PrincipalComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createCadastroComponent() {
        this.componentData = {
            component: CadastroComponent,
            inputs: {
                instancia: this.instancia
            }
        }
    }

    createRealizaFulltestComponent() {
        this.componentData = {
            component: FulltestComponent,
            inputs: {
                cadastro: this.cadastro
            }
        }
    }

}
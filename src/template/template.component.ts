import { ToastyComponent } from './../util/toasty/toasty.component';
import { Usuario } from './../viewmodel/usuario';
import { FulltestCrmComponent } from './../cadastrofulltestcrm/fulltestcrm.component';
import { BrancoComponent } from './../branco/branco.component';
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

    liberarSubNav: boolean = false;
    liberarSidNav: boolean = false;

    mostraMassivo: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private router: Router,
        private util: Util,
        private toastyComponent: ToastyComponent) { }

    /**
    * Faz ao iniciar o componente 
    **/
    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.createPrincipalComponent();
        this.validaUsr();
    }

    validaUsr() {
        //Ativa ou Bloqueia o Menu de Massivo, ativo se maior que 6
        let usr = JSON.parse(sessionStorage.getItem('user'));
        if (usr.nv >= 6) {
            this.mostraMassivo = true;
        } else {
            this.mostraMassivo = false;
        }
    }

    /**
    * Sair do sistema
    **/
    sair() {
        sessionStorage.clear();
        this.router.navigate(['./fulltest/entrar']);
    }

    /**
    * Ação para busca da instância
    **/
    busca() {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        if (usr.nv === 1) {
            this.createRealizaFulltestCrmComponent();
        } else {
            this.createCadastroComponent();
            this.subNavMenus = subNavMockCadastro;
            this.sideNavMenus = sideNavMockCadastro;
            this.nav = true;
            this.liberarSubNav = false;
            this.liberarSidNav = false;
        }
    }

    /**
    * Ações do header-nav
    **/
    cadastroClick() {
        this.createPrincipalComponent();
        this.buscaCadastro = true;
        this.nav = false;
        this.subNavMenus = null;
        this.sideNavMenus = null;
    }

    massivoClick() {
        if (this.mostraMassivo) {
            this.emptyComponentData();
            this.nav = true;
            this.buscaCadastro = false;
            this.subNavMenus = subNavMockMassivo;
            this.sideNavMenus = sideNavMockMassivo;
        } else {
            this.toastyInfo = {
                titulo: "Informativo",
                msg: "Você não possui acesso para entrar neste menu",
                theme: "warning"
            }
            this.toastyComponent.toastyInfo = this.toastyInfo;
            this.toastyComponent.addToasty();
        }
    }

    /**
    * Insere components no dynamic component
    **/
    emptyComponentData() {
        this.componentData = {
            component: BrancoComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createPrincipalComponent() {
        this.componentData = {
            component: PrincipalComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createCadastroComponent() {
        this.emptyComponentData();
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

    createRealizaFulltestCrmComponent() {
        //fulltest-crm-component
        this.emptyComponentData();
        this.componentData = {
            component: FulltestCrmComponent,
            inputs: {
                cadastro: this.cadastro
            }
        }
    }

}
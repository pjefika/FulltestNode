import { CadastroCrmComponent } from './../cadastrofulltestcrm/cadastrocrm.component';
import { HolderService } from './../util/holder/holder.service';
import { ObjectValid } from './../viewmodel/objectValid';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { Usuario } from './../viewmodel/usuario';
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

    subnav: boolean = false;
    sidenav: boolean = false;

    instancia: string = "";

    subNavMenus: SubNav[];
    sideNavMenus: SideNav[];

    componentData = null;


    cadastro: Cadastro;
    objectValid: ObjectValid;

    liberarSubNav: boolean = false;
    liberarSidNav: boolean = false;

    mostraMenus: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private router: Router,
        private util: Util,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) { }

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
        //Ativa ou Bloqueia o Menu de Massivo, ativo se maior que 6 e ativa o botão search        
        if (sessionStorage.getItem('user')) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv === 1) {
                this.buscaCadastro = true;
            }
        }
        //descomentar quando lançar
        // if (usr.nv >= 6) {
        //     this.mostraMenus = true;
        // } else {
        //     this.mostraMenus = false;
        // }
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
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
        let usr = JSON.parse(sessionStorage.getItem('user'));
        if (usr.nv === 1) {
            this.createRealizaFulltestCrmComponent();
        } else {
            this.cadastro = this.holderService.cadastro;
            this.createCadastroComponent();
            this.subNavMenus = subNavMockCadastro;
            this.sideNavMenus = sideNavMockCadastro;
            this.subnav = true;
            // this.sidenav = true;
            this.liberarSubNav = true;
            // this.liberarSidNav = true;
        }
    }

    /**
    * Ações do header-nav
    **/
    cadastroClick() {
        this.createPrincipalComponent();
        this.buscaCadastro = true;
        this.subnav = false;
        this.sidenav = false;
        this.subNavMenus = null;
        this.sideNavMenus = null;
    }

    massivoClick() {
        if (this.mostraMenus) {
            this.emptyComponentData();
            this.buscaCadastro = false;
            //descomentar quando adicionar infos...
            // this.subnav = true;
            // this.sidenav = true;          
            // this.subNavMenus = subNavMockMassivo;
            // this.sideNavMenus = sideNavMockMassivo;
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
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
        if (this.cadastro) {
            this.componentData = {
                component: FulltestComponent,
                inputs: {
                    cadastro: this.cadastro,
                    valid: this.objectValid
                }
            }
        }
    }

    createRealizaFulltestCrmComponent() {
        this.emptyComponentData();
        this.componentData = {
            component: CadastroCrmComponent,
            inputs: {
                instancia: this.instancia
            }
        }
    }

}
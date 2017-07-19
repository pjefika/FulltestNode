import { subNavMockCo } from './mock/co/mock-subnav-co';
import { ManobraComponent } from './../co/manobra/manobra.component';
import { ComplementaresComponent } from './../crm/complementares/complementares.component';
import { CadastroCrmComponent } from './../crm/cadastrofulltestcrm/cadastrocrm.component';
import { FulltestComponent } from './../co/fulltest/fulltest.component';
import { CadastroComponent } from './../co/cadastro/cadastro.component';
import { ObjectValid } from './../viewmodel/fulltest/objectValid';
import { Cadastro } from './../viewmodel/cadastro/cadastro';
import { SideNav } from './../viewmodel/menus/sidenav';
import { SubNav } from './../viewmodel/menus/subnav';
import { subNavMockCrm } from './mock/crm/mock-subnav-crm';
import { HolderService } from './../util/holder/holder.service';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { Usuario } from './../viewmodel/usuario';
import { BrancoComponent } from './../branco/branco.component';
import { PrincipalComponent } from './../principal/principal.component';
import { sideNavMockMassivo } from './mock/massivo/mock-sidenav-massivo';
import { subNavMockMassivo } from './mock/massivo/mock-subnav-massivo';
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

    mostraMenus: boolean = false;
    mostraToggle: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    signpostState: boolean = false;

    constructor(
        private router: Router,
        private util: Util,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) { }

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
            if (usr.nv >= 2) {
                this.mostraToggle = true;
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
        this.holderReset();
        let usr = JSON.parse(sessionStorage.getItem('user'));
        if (usr.nv === 1 || this.holderService.eachFulltest === "CRM") {
            this.createRealizaFulltestCrmComponent();
            this.subNavMenus = subNavMockCrm;
            this.subnav = true;
        } else {
            this.cadastro = this.holderService.cadastro;
            this.createCadastroComponent();
            this.subNavMenus = subNavMockCo;
            this.subnav = true;
            // this.sidenav = true;
            // this.sideNavMenus = sideNavMockCadastro;
        }
    }

    /**
    * Ações do header-nav
    **/
    cadastroClick() {
        this.buscaCadastro = true;
        //this.createPrincipalComponent();        
        // this.subnav = false;
        // this.sidenav = false;
        // this.subNavMenus = null;
        // this.sideNavMenus = null;
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
    emptyComponentData() { // Vazio
        this.componentData = {
            component: BrancoComponent,
            inputs: {
                nothing: null
            }
        }
    }

    createPrincipalComponent() { //Componente Principal
        this.componentData = {
            component: PrincipalComponent,
            inputs: {
                nothing: null
            }
        }
    }

    /**
    * Componentes do CO
    **/
    createCadastroComponent() { // Cadastro CO
        this.holderService.whoSubNavIsActive = "cadastro-component";
        this.emptyComponentData();
        this.componentData = {
            component: CadastroComponent,
            inputs: {
                instancia: this.instancia
            }
        }
    }

    createRealizaFulltestComponent() { //Fullteste CO
        this.holderService.whoSubNavIsActive = "full-test-component";
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

    createManobraComponent() { // Manobra CO
        this.holderService.whoSubNavIsActive = "manobra-component";
        this.emptyComponentData();
        this.componentData = {
            component: ManobraComponent,
            inputs: {
                cadastro: this.cadastro
            }
        }
    }

    /**
    * Componentes do CRM
    **/
    createRealizaFulltestCrmComponent() { // Cadastro / Fullteste CRM
        this.holderService.whoSubNavIsActive = "cadastro-crm-component";
        this.emptyComponentData();
        this.componentData = {
            component: CadastroCrmComponent,
            inputs: {
                instancia: this.instancia
            }
        }

    }

    createComplementaresComponent() { // Testes Complementares CRM
        this.holderService.whoSubNavIsActive = "complementares-component";
        this.objectValid = this.holderService.objectValid
        if (this.objectValid) {
            this.emptyComponentData();
            this.componentData = {
                component: ComplementaresComponent,
                inputs: {
                    cadastro: this.cadastro
                }
            }
        }
    }

    //Holder Functions
    holderReset() { // Reseta as variaveis da Holder
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
        this.holderService.listAsserts = null;
        this.holderService.listResumo = null;
        this.holderService.liberarSubNav = null;
        this.holderService.alertState = null;
    }
}
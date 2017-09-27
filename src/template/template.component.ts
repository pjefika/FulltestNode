import { sideNavConfLinha } from './../co/configuracao-linha/tdm/mock/mock-sidenav-co';
import { ConfiguracoesPortaComponent } from './../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { InputHolderRoute } from './../viewmodel/holder-router/input-holder-route';
import { HolderCompsService } from './../util/component-holder/services/holder-comps.service';
import { ConfiguracaoLinhaComponent } from './../co/configuracao-linha/configuracao-linha.component';
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

    public buscaCadastro: boolean = false;
    public nav: boolean = false;

    public subnav: boolean = false;
    public sidenav: boolean = false;

    public instancia: string;// = "4131543457"

    public subNavMenus: SubNav[];
    public sideNavMenus: SideNav[];

    //public componentData = null;

    public cadastro: Cadastro;
    public objectValid: ObjectValid;

    public mostraMenus: boolean = false;
    public mostraToggle: boolean = false;

    public toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    //signpostState: boolean = false;

    public headerTitle: string; // Titulo para a pagina se precisar...
    public nivelmaiorquedez: boolean = false;

    constructor(
        private router: Router,
        private util: Util,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService,
        public holderCompsService: HolderCompsService) { }

    /**
    * Faz ao iniciar o componente 
    **/
    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            } else {
                this.nivelmaiorquedez = this.util.getNv(10);
                this.createPrincipalComponent();
                this.validaUsr();
            }
        });
    }

    public validaUsr() {
        if (sessionStorage.getItem('user')) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv === 1) {
                this.buscaCadastro = true;
            }
            if (usr.nv >= 2) {
                this.mostraToggle = true;
            }
        }
    }

    /**
    * Sair do sistema
    **/
    public sair() {
        sessionStorage.clear();
        this.holderReset();
        this.router.navigate(['./entrar']);
    }

    /**
    * Ação para busca da instância
    **/
    public busca() {
        this.holderReset();
        let usr = JSON.parse(sessionStorage.getItem('user'));
        if (usr.nv === 1 || this.holderService.eachFulltest === "CRM") {
            this.subNavMenus = subNavMockCrm;
            this.holderService.subnav = true;
            this.createRealizaFulltestCrmComponent();
        } else {
            this.cadastro = this.holderService.cadastro;
            this.subNavMenus = subNavMockCo;
            this.holderService.subnav = true;
            this.createCadastroComponent();
        }
    }

    /**
    * Ações do header-nav
    **/
    public cadastroClick() {
        this.buscaCadastro = true;
    }

    public massivoClick() {
        if (this.mostraMenus) {
            this.emptyComponentData();
            this.buscaCadastro = false;
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
    public emptyComponentData() { // Vazio        
        this.holderService.sidenav = false;
        this.holderCompsService.component = BrancoComponent;
    }

    public createPrincipalComponent() { //Componente Principal
        this.headerTitle = "Bem Vindo ao Efika Fulltest";
        this.holderService.sidenav = false;
        this.holderCompsService.component = PrincipalComponent;
    }

    /**
    * Componentes do CO
    **/
    public createCadastroComponent() { // Cadastro CO
        this.holderService.sidenav = false;
        this.holderCompsService.input = { instancia: this.instancia };
        this.holderCompsService.component = CadastroComponent;
    }

    public createRealizaFulltestComponent() { //Fullteste CO
        this.holderService.sidenav = false;
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
        if (this.cadastro) {
            this.holderCompsService.input = { cadastro: this.cadastro, objectValid: this.objectValid }
            this.holderCompsService.component = FulltestComponent;
        }
    }

    public createManobraComponent() { // Manobra CO
        this.holderService.sidenav = false;
        //this.emptyComponentData();
        this.holderCompsService.input = { cadastro: this.cadastro }
        this.holderCompsService.component = ManobraComponent;
    }

    /**
   * Componentes de Linha
   **/
    public createConfiguracaoLinhaComponent() {
        if (this.holderService.cadastro.linha.tipo === "TDM") {
            this.holderService.sidenav = true;
            this.holderService.sideNavMenus = sideNavConfLinha;
            this.holderCompsService.component = ConfiguracaoLinhaComponent;
        } else if (this.holderService.cadastro.linha.tipo === "IMS") {
            this.holderCompsService.component = ConfiguracaoLinhaComponent;
        }
    }

    /**
    * Componentes do CRM
    **/
    public createRealizaFulltestCrmComponent() { // Cadastro / Fullteste CRM
        this.holderService.sidenav = false;
        this.emptyComponentData();
        this.holderCompsService.input = { instancia: this.instancia }
        this.holderCompsService.component = CadastroCrmComponent;
    }

    public createComplementaresComponent() { // Testes Complementares CRM        
        this.holderService.sidenav = false;
        this.objectValid = this.holderService.objectValid
        if (this.objectValid) {
            this.holderCompsService.input = { cadastro: this.cadastro }
            this.holderCompsService.component = ComplementaresComponent;
        }
    }

    createGoToAcsLink() {
        var newwindow = window.open('http://10.40.195.81:8080/acs-arris');
    }

    /**
    * Componentes Gerais
    **/
    public createConfiguracoesPorta() {
        this.holderService.sidenav = false;
        this.holderCompsService.component = ConfiguracoesPortaComponent;
    }

    //Holder Functions
    holderReset() { // Reseta as variaveis da Holder
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
        this.holderService.listAsserts = null;
        this.holderService.listResumo = null;
        this.holderService.liberarSubNav = false;
        this.holderService.liberarSideNav = false;
        this.holderService.alertState = null;
        this.holderService.cadastroLinha = null;
        this.headerTitle = "" //Reseta titulo
    }
}
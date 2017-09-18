import { TemplateCOService } from './util-service/template-co.service';
import { TemplateCrmService } from './util-service/tempalte-crm.service';
import { TemplateService } from './util-service/template.service';
import { AgrupamentoComponent } from './../co/configuracao-linha/actions/agrupamento/agrupamento.component';
import { sideNavConfLinha } from './../co/configuracao-linha/mock/mock-sidenav-co';
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
    styleUrls: ['template.component.css'],
    providers: [TemplateService, TemplateCrmService, TemplateCOService]
})

export class TemplateComponent implements OnInit {

    public buscaCadastro: boolean = false;
    public nav: boolean = false;

    public subnav: boolean = false;
    public sidenav: boolean = false;

    public instancia: string;// = "4131543457"

    public subNavMenus: SubNav[];
    public sideNavMenus: SideNav[];

    public componentData = null;

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
        private templateService: TemplateService,
        private templateCrmService: TemplateCrmService,
        public templateCOService: TemplateCOService) { }

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
            this.createRealizaFulltestCrmComponent();
            this.subNavMenus = subNavMockCrm;
            this.subnav = true;
        } else {
            this.cadastro = this.holderService.cadastro;
            this.createCadastroComponent();
            this.subNavMenus = subNavMockCo;
            this.subnav = true;
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
        this.sidenav = false;
        this.templateService.emptyComponentData()
            .then(data => {
                this.componentData = data;
            });
    }

    public createPrincipalComponent() { //Componente Principal
        this.headerTitle = "Bem Vindo ao Efika Fulltest";
        this.sidenav = false;
        this.templateService.createPrincipalComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    /**
    * Componentes do CO
    **/
    public createCadastroComponent() { // Cadastro CO
        //this.headerTitle = "Informações de Cadastro";
        this.sidenav = false;
        this.holderService.whoSubNavIsActive = "cadastro-component";
        //this.emptyComponentData();
        this.templateCOService.createCadastroComponent(this.instancia)
            .then(data => {
                this.componentData = data;
            });
    }

    public createRealizaFulltestComponent() { //Fullteste CO
        //this.headerTitle = "Fulltest CO";
        this.sidenav = false;
        this.holderService.whoSubNavIsActive = "full-test-component";
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
        if (this.cadastro) {
            this.templateCOService.createRealizaFulltestComponent(this.cadastro, this.objectValid)
                .then(data => {
                    this.componentData = data;
                });
        }
    }

    public createManobraComponent() { // Manobra CO
        //this.headerTitle = "Manobra";
        this.sidenav = false;
        this.holderService.whoSubNavIsActive = "manobra-component";
        this.emptyComponentData();
        this.templateCOService.createManobraComponent(this.cadastro)
            .then(data => {
                this.componentData = data;
            });
    }

    public createConfiguracaoLinhaComponent() {
        this.holderService.whoSubNavIsActive = "configuracao-linha-component";
        this.holderService.whoSideNavIsActive = "configuracao-linha-component";
        this.sidenav = true;
        this.sideNavMenus = sideNavConfLinha;
        this.templateCOService.createConfiguracaoLinhaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    /**
    * Componentes do CRM
    **/

    public createRealizaFulltestCrmComponent() { // Cadastro / Fullteste CRM
        //this.headerTitle = "Fulltest CRM";
        this.sidenav = false;
        this.holderService.whoSubNavIsActive = "cadastro-crm-component";
        this.emptyComponentData();
        this.templateCrmService.createRealizaFulltestCrmComponent(this.instancia)
            .then(data => {
                this.componentData = data;
            });

    }

    public createComplementaresComponent() { // Testes Complementares CRM        
        //this.headerTitle = "Tests Complementares";
        this.sidenav = false;
        this.holderService.whoSubNavIsActive = "complementares-component";
        this.objectValid = this.holderService.objectValid
        if (this.objectValid) {
            this.templateCrmService.createComplementaresComponent(this.cadastro)
                .then(data => {
                    this.componentData = data;
                });
        }
    }

    createGoToAcsLink() {
        var newwindow = window.open('http://10.40.195.81:8080/acs-arris');
    }

    /*
    * Create Sidenav Components Linha 
    */
    public createAgrupamentoComponent() {
        this.holderService.whoSideNavIsActive = "agrupamento-component";
        this.templateCOService.createAgrupamentoComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createCustgroupComponent() {
        this.holderService.whoSideNavIsActive = "custgroup-component";
        this.templateCOService.createCustgroupComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createLinhaComponent() {
        this.holderService.whoSideNavIsActive = "linha-component";
        this.templateCOService.createLinhaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createManobrarLinhaComponent() {
        this.holderService.whoSideNavIsActive = "manobrar-linha-component";
        this.templateCOService.createManobrarLinhaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createNcosComponent() {
        this.holderService.whoSideNavIsActive = "ncos-component";
        this.templateCOService.createNcosComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createServicoLinhaComponent() {
        this.holderService.whoSideNavIsActive = "servico-linha-component";
        this.templateCOService.createServicoLinhaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createStatusLinhaComponent() {
        this.holderService.whoSideNavIsActive = "status-linha-component";
        this.templateCOService.createStatusLinhaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    public createStatusPortaComponent() {
        this.holderService.whoSideNavIsActive = "status-porta-component";
        this.templateCOService.createStatusPortaComponent()
            .then(data => {
                this.componentData = data;
            });
    }

    //Holder Functions
    holderReset() { // Reseta as variaveis da Holder
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
        this.holderService.listAsserts = null;
        this.holderService.listResumo = null;
        this.holderService.liberarSubNav = null;
        this.holderService.liberarSideNav = null;
        this.holderService.alertState = null;
        this.holderService.cadastroLinha = null;
        this.headerTitle = "" //Reseta titulo

    }
}
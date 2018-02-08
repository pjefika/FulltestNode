import { CadastroComponent } from './../co/cadastro/cadastro.component';
import { subNavMockCo } from './mock/co/mock-subnav-co';
import { CadastroCrmComponent } from './../crm/cadastrofulltestcrm/cadastrocrm.component';
import { subNavMockCrm } from './mock/crm/mock-subnav-crm';
import { Router } from '@angular/router';
import { PrincipalComponent } from './../principal/principal.component';
import { DynamicRouterHolderService } from './../util/dynamic-router/dynamic-router-holder.service';
import { HolderService } from './../util/holder/holder.service';
import { Util } from './../util/util';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InfoTecnicasComponent } from 'co/info-tecnicas/info-tecnicas.component';

@Component({
    selector: 'template-full',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(300)
            ]),
            transition('* => void', [
                animate(300, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})

export class TemplateComponent implements OnInit {

    public instancia: string;

    public mostraMenus: boolean = false;
    public mostraToggle: boolean = false;

    public nivelmaiorquedez: boolean = false;

    private serarching: boolean = false;

    constructor(
        private router: Router,
        private util: Util,
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService) {
    }

    /**
    * Faz ao iniciar o componente 
    **/
    public ngOnInit(): void {
        this.util
            .isLogado()
            .then((result => {
                if (!result) {
                    this.router.navigate(['./entrar']);
                } else {
                    this.nivelmaiorquedez = this.util.getNv(10);
                    this.setToDynamicComponent(PrincipalComponent);
                    this.showToggle();
                }
            }));
        this.buildEstaAtualizado();
    }

    private showToggle() {
        if (!this.validUser()) {
            this.mostraToggle = true;
        }
    }

    private validUser(): Boolean {
        let valid: boolean = false;
        if (sessionStorage.getItem('user')) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv === 1 || this.holderService.eachFulltest === "CRM") {
                valid = true;
            }
        }
        return valid;
    }

    /**
    * Sair do sistema
    **/
    public sair() {
        sessionStorage.clear();
        this.holderReset();
        this.router.navigate(['./entrar']);

    }

    public setToDynamicComponent(component: any) {
        // Sempre resetar para null antes de setar component
        this.dynamicRouterHolderService.component = null;
        // Deixar timeout senão react não entende que mudou variavel na holder.
        setTimeout(() => {
            this.dynamicRouterHolderService.component = component;
        }, 1);
    }

    private mostraSubNav(ativo: boolean, whatSubNav?: any) {
        this.holderService.subNavMenus = whatSubNav;
        // this.holderService.subnav = ativo;
    }

    /**
    * Ação para busca da instância
    **/
    public busca() {
        this.holderReset();
        if (this.validUser()) {
            this.mostraSubNav(true, subNavMockCrm);
            this.setToDynamicComponent(CadastroCrmComponent);
        } else {
            this.mostraSubNav(true, subNavMockCo);
            this.setToDynamicComponent(InfoTecnicasComponent);
            this.setfalsesubsnavs();
        }
    }

    private setfalsesubsnavs() {
        this.holderService.subNavMenus[0].ativo = false;
        this.holderService.subNavMenus[1].ativo = false;
        this.holderService.subNavMenus[2].ativo = false;
        this.holderService.subNavMenus[3].ativo = false;
        this.holderService.subNavMenus[4].ativo = false;
    }

    private buildEstaAtualizado() {
        setInterval(() => {
            //console.log("Verifica atualização.");            
            if (this.util.isAtualizado()) {
                this.holderService.appLevelAlertAtivo = true;
                this.holderService.appLevelAlert = {
                    type: "alert-warning",
                    msg: "Esta versão do sistema pode estar desatualizada, ocasionando conflitos, atualize sua página.",
                    buttonAction: "refresh",
                    buttonName: "Atualizar"
                }
            }
        }, 60000); // Timeout para verificação; definir tempo;
    }

    public hoResumo() {
        if (this.holderService.resumoInfosAtivo) {
            this.holderService.resumoInfosAtivo = false;
        } else {
            this.holderService.resumoInfosAtivo = true;
        }
    }

    //Holder Functions
    private holderReset() { // Reseta as variaveis da Holder
        this.mostraSubNav(false, null);
        this.holderService.subnav = false;
        this.holderService.clienteSoLinha = false;
        this.holderService.sidenav = false;
        this.holderService.cadastro = null;
        this.holderService.showWizardComponent = false;
        this.holderService.objectValid = null;
        this.holderService.listAsserts = null;
        this.holderService.listResumo = null;
        this.holderService.liberarSubNav = false;
        this.holderService.liberarSideNav = false;
        this.holderService.alertState = null;
        this.holderService.cadastroLinha = null;
        this.holderService.confPorta = null;
        this.holderService.equipamentos = null;
        this.holderService.objectValidManobra = null;
        this.holderService.resumoInfosAtivo = false;
        this.holderService.certifications = null;
        this.holderService.jaFoiPesquisadoAcs = false;
    }
}
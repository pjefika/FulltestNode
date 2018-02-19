import { Component, OnInit } from '@angular/core';
import { TemplateService } from './template.service';
import { UtilService } from '../util/util.service';
import { SystemHolderService } from '../util/holder/systemHolder.service';
import { DynamicRouterService } from '../util-components/dynamicrouter/dynamic-router.service';
import { PrincipalComponent } from '../principal/principal.component';
import { VariavelHolderService } from '../util/holder/variavelholder.service';
import { CadastroComponent } from '../util-components/cadastro/cadastro.component';
import { SubNavMockCo } from '../util/mocks/subsnav/subNavMockCo';
import { SuperComponentService } from '../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../util-components/toasty/toasty.component';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [TemplateService]
})

export class TemplateComponent extends SuperComponentService implements OnInit {

    constructor(public util: UtilService,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService,
        private templateService: TemplateService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.util
            .isLogado()
            .then((result => {
                if (!result) {
                    this.util.navigate('./entrar');
                } else {
                    this.systemHolderService.isAdm = this.util.getNv(10);
                    this.setToDynamicComponent(PrincipalComponent);
                    this.showToggle();
                }
            }));
    }

    public setToDynamicComponent(component: any) {
        this.dynamicRouterService.component = null;
        setTimeout(() => {
            this.dynamicRouterService.component = component;
        }, 1);
    }

    private showToggle() {
        if (!this.util.validUser()) {
            this.systemHolderService.mostraToggle = true;
        }
    }

    private sair() {
        sessionStorage.clear();
        this.util.navigate('./entrar');
    }

    /** 
    * Busca a instância 
    */
    private busca() {
        this.holderReset();
        this.templateService.setFalseMenus();
        if (this.util.validUser()) {
            // CRM
        } else {
            // CO           
            this.setToDynamicComponent(CadastroComponent);
            this.systemHolderService.qualView = "CO";
            this.systemHolderService.subNavMenus = SubNavMockCo;
        }
    }

    private holderReset() {
        this.variavelHolderService = new VariavelHolderService();
        this.systemHolderService = new SystemHolderService();
    }
}
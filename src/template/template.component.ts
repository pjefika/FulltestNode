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
import { HolderResetService } from '../util/holder/holderreset.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CadastroCrmViewComponent } from '../util-components/cadastro/crm-view/cadastro-crm-view.component';
import { SubNavMockCrm } from '../util/mocks/subsnav/subNavMockCrm';

@Component({
    selector: 'template-component',
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [TemplateService, HolderResetService],
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

export class TemplateComponent extends SuperComponentService implements OnInit {

    constructor(public util: UtilService,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService,
        private templateService: TemplateService,
        public toastyComponent: ToastyComponent,
        private holderResetService: HolderResetService) {
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
        this.setToDynamicComponent(CadastroComponent);
        if (this.util.validUser()) {
            // CRM
            // this.setToDynamicComponent(CadastroCrmVFiewComponent);
            this.systemHolderService.qualView = "CRM";
            this.systemHolderService.subNavMenus = SubNavMockCrm;
        } else {
            // CO           
            // this.setToDynamicComponent(CadastroComponent);
            this.systemHolderService.qualView = "CO";
            this.systemHolderService.subNavMenus = SubNavMockCo;
        }
    }

    public hoResumo() {
        if (this.systemHolderService.resumoInfosAtivo) {
            this.systemHolderService.resumoInfosAtivo = false;
        } else {
            this.systemHolderService.resumoInfosAtivo = true;
        }
    }

    private holderReset() {
        this.holderResetService.reset();
    }

}
import { ManobrarLinhaComponent } from './../../co/configuracao-linha/actions/manobrar/manobrar-linha.component';
import { ServicoLinhaComponent } from './../../co/configuracao-linha/actions/servico/servico-linha.component';
import { LinhaComponent } from './../../co/configuracao-linha/actions/linha/linha.component';
import { ComplementaresComponent } from './../../crm/complementares/complementares.component';
import { CadastroCrmComponent } from './../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { ConfiguracaoLinhaComponent } from './../../co/configuracao-linha/configuracao-linha.component';
import { ManobraComponent } from './../../co/manobra/manobra.component';
import { FulltestComponent } from './../../co/fulltest/fulltest.component';
import { InputHolderRoute } from './../../viewmodel/holder-router/input-holder-route';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { CadastroComponent } from './../../co/cadastro/cadastro.component';
import { TemplateCrmService } from './../../template/util-service/tempalte-crm.service';
import { BrancoComponent } from './../../branco/branco.component';
import { PrincipalComponent } from './../../principal/principal.component';
import { TemplateService } from './../../template/util-service/template.service';
import { TemplateCOService } from './../../template/util-service/template-co.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderRouterService {

    private component: any;

    private input: InputHolderRoute;

    constructor(
        private templateService: TemplateService,
        private templateCOService: TemplateCOService,
        private templateCrmService: TemplateCrmService) { }

    public matchComponent(component: any, input?: InputHolderRoute) {
        this.indexRoute(component, input);
        this.coRoute(component, input);
        this.crmRoute(component, input);
        this.coLinhaRoute(component);
    }

    public indexRoute(component: any, input?: InputHolderRoute) {
        switch (component) { // Principal
            case PrincipalComponent:
                this.component = this.templateService.createPrincipalComponent();
                break;
            case BrancoComponent:
                this.component = this.templateService.emptyComponentData();
                break;
        }
    }

    public coRoute(component: any, input?: InputHolderRoute) {
        switch (component) { // CO
            case CadastroComponent:
                this.component = this.templateCOService.createCadastroComponent(input.instancia);
                break;
            case ManobraComponent:
                this.component = this.templateCOService.createManobraComponent(input.cadastro);
                break;
            case FulltestComponent:
                this.component = this.templateCOService.createRealizaFulltestComponent(input.cadastro, input.objectValid);
                break;
            case ConfiguracaoLinhaComponent:
                this.component = this.templateCOService.createConfiguracaoLinhaComponent();
                break;
        }
    }

    public crmRoute(component: any, input?: InputHolderRoute) {
        switch (component) { // CR-EMO
            case CadastroCrmComponent:
                this.component = this.templateCrmService.createRealizaFulltestCrmComponent(input.instancia);
                break;
            case ComplementaresComponent:
                this.component = this.templateCrmService.createComplementaresComponent(input.cadastro);
                break;
        }
    }

    public coLinhaRoute(component: any) {
        switch (component) {
            case ConfiguracaoLinhaComponent:
                this.component = this.templateCOService.createConfiguracaoLinhaComponent();
                break;
            case LinhaComponent:
                this.component = this.templateCOService.createLinhaComponent();
                break;
            case ServicoLinhaComponent:
                this.component = this.templateCOService.createServicoLinhaComponent();
                break;
            case ManobrarLinhaComponent:
                this.component = this.templateCOService.createManobrarLinhaComponent();
                break;
        }
    }

    public return(component: any, input?: InputHolderRoute): any {
        this.matchComponent(component, input);
        return this.component;
    }
}
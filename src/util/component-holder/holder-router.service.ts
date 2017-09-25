import { CoLinhaRouterService } from './services-routes/co-linha-router.service';
import { CrmRouterService } from './services-routes/crm-router.service';
import { CoRouterService } from './services-routes/co-router.service';
import { IndexRouterService } from './services-routes/index-router.service';
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
        private indexRouterService: IndexRouterService,
        private coRouterService: CoRouterService,
        private crmRouterService: CrmRouterService,
        private coLinhaRouterService: CoLinhaRouterService) { }


    public return(component: any, input?: InputHolderRoute): any {
        this.matchComponent(component, input);
        return this.component;
    }

    public matchComponent(component: any, input?: InputHolderRoute) {
        if (component === PrincipalComponent || component === BrancoComponent) {
            this.component = this.indexRouterService.indexRoute(component, input);
        } else if (component === CadastroComponent || component === ManobraComponent || component === FulltestComponent || component === ConfiguracaoLinhaComponent) {
            this.component = this.coRouterService.coRoute(component, input);
        } else if (component === CadastroCrmComponent || component === ComplementaresComponent) {
            this.component = this.crmRouterService.crmRoute(component, input);
        } else if (component === ConfiguracaoLinhaComponent || component === LinhaComponent || component === ServicoLinhaComponent || component === ManobrarLinhaComponent) {
            this.component = this.coLinhaRouterService.coLinhaRoute(component);
        }

        // this.component = this.indexRouterService.indexRoute(component, input);
        // this.component = this.coRouterService.coRoute(component, input);
        // this.component = this.crmRouterService.crmRoute(component, input);
        // this.component = this.coLinhaRouterService.coLinhaRoute(component);
    }

}
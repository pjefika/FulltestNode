import { ComplementaresComponent } from './../../../crm/complementares/complementares.component';
import { CadastroCrmComponent } from './../../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { InputHolderRoute } from './../../../viewmodel/holder-router/input-holder-route';
import { TemplateCrmService } from './../../../template/util-service/tempalte-crm.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CrmRouterService {

    private component: any;

    constructor(
        private templateCrmService: TemplateCrmService) { }

    public crmRoute(component: any, input?: InputHolderRoute) {
        switch (component) { // CR-EMO
            case CadastroCrmComponent:
                this.component = this.templateCrmService.createRealizaFulltestCrmComponent(input.instancia);
                break;
            case ComplementaresComponent:
                this.component = this.templateCrmService.createComplementaresComponent(input.cadastro);
                break;
        }
        return this.component;
    }
}
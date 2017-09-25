import { TemplateService } from './../../../template/util-service/template.service';
import { InputHolderRoute } from './../../../viewmodel/holder-router/input-holder-route';
import { BrancoComponent } from './../../../branco/branco.component';
import { PrincipalComponent } from './../../../principal/principal.component';
import { Injectable } from '@angular/core';

@Injectable()
export class IndexRouterService {

    private component: any;

    constructor(
        private templateService: TemplateService) { }

    public indexRoute(component: any, input?: InputHolderRoute): Promise<any> {
        switch (component) { // Principal
            case PrincipalComponent:
                this.component = this.templateService.createPrincipalComponent();
                break;
            case BrancoComponent:
                this.component = this.templateService.emptyComponentData();
                break;
        }        
        return this.component;
    }
}
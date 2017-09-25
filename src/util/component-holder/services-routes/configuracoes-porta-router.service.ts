import { ConfiguracoesPortaComponent } from './../../comp_complementares/configuracoesporta/configuracoesporta.component';
import { TemplateGeralService } from './../../../template/util-service/template-geral.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracoesPortaRouterService {

    private component: any;

    constructor(
        private templateGeralService: TemplateGeralService) { }

    public confPortaRoute(component: any) {
        switch (component) {
            case ConfiguracoesPortaComponent:
                this.component = this.templateGeralService.CreateConfiguracoesPortaComponentData();
                break;
        }
        return this.component;
    }
}
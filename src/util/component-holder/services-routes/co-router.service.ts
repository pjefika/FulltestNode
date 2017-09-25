import { TemplateCOService } from './../../../template/util-service/template-co.service';
import { ConfiguracaoLinhaComponent } from './../../../co/configuracao-linha/configuracao-linha.component';
import { FulltestComponent } from './../../../co/fulltest/fulltest.component';
import { ManobraComponent } from './../../../co/manobra/manobra.component';
import { CadastroComponent } from './../../../co/cadastro/cadastro.component';
import { InputHolderRoute } from './../../../viewmodel/holder-router/input-holder-route';
import { Injectable } from '@angular/core';

@Injectable()
export class CoRouterService {

    private component: any;

    constructor(
        private templateCOService: TemplateCOService) { }

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
        return this.component;
    }
}
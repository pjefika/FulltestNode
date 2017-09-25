import { ManobrarLinhaComponent } from './../../../co/configuracao-linha/actions/manobrar/manobrar-linha.component';
import { ServicoLinhaComponent } from './../../../co/configuracao-linha/actions/servico/servico-linha.component';
import { LinhaComponent } from './../../../co/configuracao-linha/actions/linha/linha.component';
import { ConfiguracaoLinhaComponent } from './../../../co/configuracao-linha/configuracao-linha.component';
import { TemplateCOService } from './../../../template/util-service/template-co.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CoLinhaRouterService {

    private component: any;

    constructor(
        private templateCOService: TemplateCOService) { }

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
        return this.component;
    }
}
import { ConfiguracoesPortaComponent } from './../../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateGeralService {

    private componentData = null;

    constructor() { }

    public CreateConfiguracoesPortaComponentData(): any {
        this.componentData = {
            component: ConfiguracoesPortaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }
}
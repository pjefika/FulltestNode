import { ComplementaresComponent } from './../../crm/complementares/complementares.component';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { CadastroCrmComponent } from './../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class TemplateCrmService {

    private componentData = null;

    constructor() { }

    public createRealizaFulltestCrmComponent(instancia: string): any {
        this.componentData = {
            component: CadastroCrmComponent,
            inputs: {
                instancia: instancia
            }
        }
        return this.componentData;
    }

    public createComplementaresComponent(cadastro: Cadastro): any {
        this.componentData = {
            component: ComplementaresComponent,
            inputs: {
                cadastro: cadastro
            }
        }
        return this.componentData;
    }
}
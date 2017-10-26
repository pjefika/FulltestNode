import { ServicoLinhaComponent } from './../../co/configuracao-linha/tdm/actions/servico/servico-linha.component';
import { ManobrarLinhaComponent } from './../../co/configuracao-linha/tdm/actions/manobrar/manobrar-linha.component';
import { LinhaComponent } from './../../co/configuracao-linha/tdm/actions/linha/linha.component';
import { ManobraComponent } from './../../co/manobra/manobra.component';
import { ConfiguracaoLinhaComponent } from './../../co/configuracao-linha/configuracao-linha.component';
import { FulltestComponent } from './../../co/fulltest/fulltest.component';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { CadastroComponent } from './../../co/cadastro/cadastro.component';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class TemplateCOService {

    private componentData = null;

    constructor() { }

    /*
    * Components de cadastro...
    */
    public createCadastroComponent(instancia: string): any {
        this.componentData = {
            component: CadastroComponent,
            inputs: {
                instancia: instancia
            }
        }
        return this.componentData;
    }
    /*
    * Components do Fulltest...
    */
    public createRealizaFulltestComponent(cadastro: Cadastro, objectValid: ObjectValid): any {
        this.componentData = {
            component: FulltestComponent,
            inputs: {
                cadastro: cadastro,
                valid: objectValid
            }
        }
        return this.componentData;
    }

    /*
    * Componente de manobra...
    */
    public createManobraComponent(cadastro: Cadastro): any {
        this.componentData = {
            component: ManobraComponent,
            inputs: {
                cadastro: cadastro
            }
        }
        return this.componentData;
    }

    /*
    * Componentes de configuração de linha...
    */
    public createConfiguracaoLinhaComponent(): any {
        this.componentData = {
            component: ConfiguracaoLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createLinhaComponent(): any {
        this.componentData = {
            component: LinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createManobrarLinhaComponent(): any {
        this.componentData = {
            component: ManobrarLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createServicoLinhaComponent(): any {
        this.componentData = {
            component: ServicoLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }   

}
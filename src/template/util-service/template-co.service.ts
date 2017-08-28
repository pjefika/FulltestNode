import { StatusPortaComponent } from './../../co/configuracao-linha/actions/status-porta/status-porta.component';
import { StatusLinhaComponent } from './../../co/configuracao-linha/actions/status-linha/status-linha.component';
import { ServicoLinhaComponent } from './../../co/configuracao-linha/actions/servico/servico-linha.component';
import { NcosComponent } from './../../co/configuracao-linha/actions/ncos/ncos.component';
import { ManobrarLinhaComponent } from './../../co/configuracao-linha/actions/manobrar/manobrar-linha.component';
import { LinhaComponent } from './../../co/configuracao-linha/actions/linha/linha.component';
import { CustgroupComponent } from './../../co/configuracao-linha/actions/custgroup/custgroup.component';
import { AgrupamentoComponent } from './../../co/configuracao-linha/actions/agrupamento/agrupamento.component';
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
    public createCadastroComponent(instancia: string): Promise<any> {
        this.componentData = {
            component: CadastroComponent,
            inputs: {
                instancia: instancia
            }
        }
        return Promise.resolve(this.componentData);
    }
    /*
    * Components do Fulltest...
    */
    public createRealizaFulltestComponent(cadastro: Cadastro, objectValid: ObjectValid): Promise<any> {
        this.componentData = {
            component: FulltestComponent,
            inputs: {
                cadastro: cadastro,
                valid: objectValid
            }
        }
        return Promise.resolve(this.componentData);
    }

    /*
    * Componente de manobra...
    */
    public createManobraComponent(cadastro: Cadastro): Promise<any> {
        this.componentData = {
            component: ManobraComponent,
            inputs: {
                cadastro: cadastro
            }
        }
        return Promise.resolve(this.componentData);
    }

    /*
    * Componentes de configuração de linha...
    */
    public createConfiguracaoLinhaComponent(): Promise<any> {
        this.componentData = {
            component: ConfiguracaoLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createAgrupamentoComponent(): Promise<any> {
        this.componentData = {
            component: AgrupamentoComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createCustgroupComponent(): Promise<any> {        
        this.componentData = {
            component: CustgroupComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createLinhaComponent(): Promise<any> {
        this.componentData = {
            component: LinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createManobrarLinhaComponent(): Promise<any> {
        this.componentData = {
            component: ManobrarLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createNcosComponent(): Promise<any> {
        this.componentData = {
            component: NcosComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createServicoLinhaComponent(): Promise<any> {
        this.componentData = {
            component: ServicoLinhaComponent,
            inputs: {
                nothing: null
            }
        }        
        return Promise.resolve(this.componentData);
    }

    public createStatusLinhaComponent(): Promise<any> {
        this.componentData = {
            component: StatusLinhaComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

    public createStatusPortaComponent(): Promise<any> {
        this.componentData = {
            component: StatusPortaComponent,
            inputs: {
                nothing: null
            }
        }
        return Promise.resolve(this.componentData);
    }

}
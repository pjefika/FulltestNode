import { ConfiguracoesPortaComponent } from './../../../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { FulltestComponent } from './../../../co/fulltest/fulltest.component';
import { ConfiguracaoLinhaComponent } from './../../../co/configuracao-linha/configuracao-linha.component';
import { ManobraComponent } from './../../../co/manobra/manobra.component';
import { CadastroComponent } from './../../../co/cadastro/cadastro.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
export const subNavMockCo: SubNav[] = [
    {
        nome: "Informações de Cadastro",
        component: CadastroComponent
    },
    {
        nome: "Fulltest",
        component: FulltestComponent
    },
    {
        nome: "Validador Manobra",
        component: ManobraComponent
    },    
    {
        nome: "Configuração Linha",
        component: ConfiguracaoLinhaComponent
    },    
    {
        nome: "Configuração de Porta",
        component: ConfiguracoesPortaComponent
    }
]
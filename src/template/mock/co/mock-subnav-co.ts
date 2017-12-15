import { ConfiguracoesPortaComponent } from './../../../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { ConfiguracaoLinhaComponent } from './../../../co/configuracao-linha/configuracao-linha.component';
import { ManobraComponent } from './../../../co/manobra/manobra.component';
import { FulltestComponent } from './../../../co/fulltest/fulltest.component';
import { CadastroComponent } from './../../../co/cadastro/cadastro.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
import { InfoTecnicasComponent } from 'co/info-tecnicas/info-tecnicas.component';

export const subNavMockCo: SubNav[] = [
    {
        nome: "Informações Técnicas",
        component: InfoTecnicasComponent
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
        nome: "Configurações de Porta",
        component: ConfiguracoesPortaComponent
    }
]
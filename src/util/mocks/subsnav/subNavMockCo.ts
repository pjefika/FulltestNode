import { SubNav } from "../../../viewmodel/subnav/subnav";
import { CadastroComponent } from "../../../util-components/cadastro/cadastro.component";
import { FulltestComponent } from "../../../util-components/fulltest/fulltest.component";
import { ConfiguracaoLinhaComponent } from "../../../util-components/configuracaolinha/configuracao-linha.component";
import { ConfiguracaoPortaComponent } from "../../../util-components/configuracaoporta/configuracao-porta.component";
import { ManobrarComponent } from "../../../util-components/manobrar/manobrar.component";

export const SubNavMockCo: SubNav[] = [
    {
        nome: "Informações Técnicas",
        component: CadastroComponent
    },
    {
        nome: "Fulltest",
        component: FulltestComponent
    },
    {
        nome: "Validador Manobra",
        component: ManobrarComponent
    },
    {
        nome: "Configuração Linha",
        component: ConfiguracaoLinhaComponent,
        haveSideNav: true
    },
    {
        nome: "Configurações de Porta",
        component: ConfiguracaoPortaComponent
    }
]
import { SubNav } from "../../../viewmodel/subnav/subnav";
import { CadastroComponent } from "../../../util-components/cadastro/cadastro.component";
import { FulltestComponent } from "../../../util-components/fulltest/fulltest.component";
import { ConfiguracaoLinhaComponent } from "../../../util-components/configuracaolinha/configuracao-linha.component";
import { ConfiguracaoPortaComponent } from "../../../util-components/configuracaoporta/configuracao-porta.component";
import { ValidadorManobraComponent } from "../../../util-components/validadormanobra/validador-manobra.component";
import { ValidadorDowngradeComponent } from "../../../util-components/validadordowngrade/validador-downgrade.component";

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
        component: ValidadorManobraComponent
    },
    {
        nome: "Validador Dowgrade",
        component: ValidadorDowngradeComponent
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
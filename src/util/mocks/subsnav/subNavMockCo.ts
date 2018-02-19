import { SubNav } from "../../../viewmodel/subnav/subnav";
import { CadastroComponent } from "../../../util-components/cadastro/cadastro.component";
import { FulltestComponent } from "../../../util-components/fulltest/fulltest.component";

export const SubNavMockCo: SubNav[] = [
    {
        nome: "Informações Técnicas",
        component: CadastroComponent
    },
    {
        nome: "Fulltest",
        component: FulltestComponent
    }
]
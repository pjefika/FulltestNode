import { SubNav } from "../../../viewmodel/subnav/subnav";
import { CadastroCrmViewComponent } from "../../../util-components/cadastro/crm-view/cadastro-crm-view.component";

export const SubNavMockCrm: SubNav[] = [
    {
        nome: "Fulltest",
        component: CadastroCrmViewComponent
    },
    {
        nome: "Link ACS Arris",
        link: "http://10.200.35.67/acs-arris/"
    },
    {
        nome: "Link ACS Motive",
        link: "http://10.40.198.168/acs/"
    }
]
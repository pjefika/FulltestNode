import { ConfiguracoesPortaComponent } from './../../../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { CadastroCrmComponent } from './../../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
export const subNavMockCrm: SubNav[] = [
    {
        nome: "Fulltest",
        component: CadastroCrmComponent
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
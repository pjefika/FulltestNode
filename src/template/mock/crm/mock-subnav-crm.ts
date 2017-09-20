import { CadastroCrmComponent } from './../../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
export const subNavMockCrm: SubNav[] = [
    {
        nome: "Fulltest",
        component: CadastroCrmComponent
    },
    {
        nome: "Link ACS",
        component: "link-acs"
    }
    // {
    //     nome: "Testes Complementares",
    //     component: "complementares-component"
    // },
]
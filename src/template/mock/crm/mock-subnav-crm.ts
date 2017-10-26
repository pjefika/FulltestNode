import { CadastroCrmComponent } from './../../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
export const subNavMockCrm: SubNav[] = [
    {
        nome: "Fulltest",
        component: CadastroCrmComponent
    },
    {
        nome: "Link ACS",
        link: "http://10.40.195.81:8080/acs-arris"
    }
]
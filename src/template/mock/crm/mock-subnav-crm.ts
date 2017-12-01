import { ConfiguracoesPortaComponent } from './../../../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { CadastroCrmComponent } from './../../../crm/cadastrofulltestcrm/cadastrocrm.component';
import { SubNav } from './../../../viewmodel/menus/subnav';
export const subNavMockCrm: SubNav[] = [
    {
        nome: "Fulltest",
        component: CadastroCrmComponent
    },
    {
        nome: "Configurações de Porta",
        component: ConfiguracoesPortaComponent
    },
    {
        nome: "Link ACS",
        link: "http://10.200.35.67/acs-arris/"
    }
]
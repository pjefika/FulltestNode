import { SideNav } from "../../../viewmodel/sidenav/sidenav";
import { ConfiguracaoLinhaComponent } from "../../../util-components/configuracaolinha/configuracao-linha.component";

export const SideNavMockLinhaCO: SideNav[] = [
    {
        nome: "Informações da Linha",
        component: ConfiguracaoLinhaComponent,
        icon: "view-list"
    },
    // {
    //     nome: "Manobrar",
    //     component: ManobrarLinhaComponent,
    //     icon: "switch"
    // },
    // {
    //     nome: "Linha",
    //     component: LinhaComponent,
    //     icon: "phone-handset"
    // },
    // {
    //     nome: "Serviço",
    //     component: ServicoLinhaComponent,
    //     icon: "install"
    // }
]
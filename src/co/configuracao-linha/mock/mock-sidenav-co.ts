import { ManobrarLinhaComponent } from './../actions/manobrar/manobrar-linha.component';
import { ServicoLinhaComponent } from './../actions/servico/servico-linha.component';
import { LinhaComponent } from './../actions/linha/linha.component';
import { ConfiguracaoLinhaComponent } from './../configuracao-linha.component';
import { SideNav } from './../../../viewmodel/menus/sidenav';
export const sideNavConfLinha: SideNav[] = [
    {
        nome: "Informações de linha",
        component: ConfiguracaoLinhaComponent
    },
    {
        nome: "Manobrar",
        component: ManobrarLinhaComponent
    },
    {
        nome: "Linha",
        component: LinhaComponent
    },
    {
        nome: "Serviço",
        component: ServicoLinhaComponent
    }
]
import { ConfiguracaoLinhaComponent } from './../../configuracao-linha.component';
import { SideNav } from './../../../../viewmodel/menus/sidenav';
import { ManobrarLinhaComponent } from './../actions/manobrar/manobrar-linha.component';
import { ServicoLinhaComponent } from './../actions/servico/servico-linha.component';
import { LinhaComponent } from './../actions/linha/linha.component';
export const sideNavConfLinha: SideNav[] = [
    {
        nome: "Informações de linha",
        component: ConfiguracaoLinhaComponent,
        icon: "view-list"
    },
    {
        nome: "Manobrar",
        component: ManobrarLinhaComponent,
        icon: "switch"
    },
    {
        nome: "Linha",
        component: LinhaComponent,
        icon: "phone-handset"
    },
    {
        nome: "Serviço",
        component: ServicoLinhaComponent,
        icon: "install"
    }
]
import { ServicoLinhaComponent } from './../actions/servico/servico-linha.component';
import { LinhaComponent } from './../actions/linha/linha.component';
import { ManobrarLinhaComponent } from './../actions/manobrar/manobrar-linha.component';
import { ConfiguracaoLinhaComponent } from './../../configuracao-linha.component';
import { SideNav } from './../../../../viewmodel/menus/sidenav';
export const mockListSidenavCoTdm: SideNav[] = [
    {
        nome: "Informações da Linha",
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
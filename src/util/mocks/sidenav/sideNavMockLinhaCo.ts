import { SideNav } from "../../../viewmodel/sidenav/sidenav";
import { ConfiguracaoLinhaComponent } from "../../../util-components/configuracaolinha/configuracao-linha.component";
import { ConfiguracaoManobraLinhaComponent } from "../../../util-components/configuracaolinha/manobralinha/configuracao-manobra-linha.component";
import { ConfiguracaoLinhaCreateDeleteComponent } from "../../../util-components/configuracaolinha/linhacreatedelete/configuracao-linha-create-delete.component";
import { ConfiguracaoServicosLinhaComponent } from "../../../util-components/configuracaolinha/servicos/configuracao-servicos-linha.component";

export const SideNavMockLinhaCO: SideNav[] = [
    {
        nome: "Informações da Linha",
        component: ConfiguracaoLinhaComponent,
        icon: "view-list"
    },
    {
        nome: "Manobrar",
        component: ConfiguracaoManobraLinhaComponent,
        icon: "switch"
    },
    {
        nome: "Linha",
        component: ConfiguracaoLinhaCreateDeleteComponent,
        icon: "phone-handset"
    },
    {
        nome: "Serviço",
        component: ConfiguracaoServicosLinhaComponent,
        icon: "install"
    }
]
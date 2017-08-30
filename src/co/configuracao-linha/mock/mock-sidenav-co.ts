import { SideNav } from './../../../viewmodel/menus/sidenav';
export const sideNavConfLinha: SideNav[] = [
    {
        nome: "Informações da Linha",
        component: "configuracao-linha-component"
    },
    {
        nome: "Agrupamento",
        collapsible: true,
        collapsibleMenu: [
            {
                nome: "Ativar",
                component: "ativar-agrupamento-component"
            },
            {
                nome: "Consultar",
                component: "consultar-agrupamento-component"
            },
            {
                nome: "Desativar",
                component: "desativar-agrupamento-component"
            },
        ]
    },
    {
        nome: "Alterar CUSTGROUP",
        component: "custgroup-component"
    },
    {
        nome: "Alterar NCOS",
        component: "ncos-component"
    },
    {
        nome: "Linha",
        collapsible: true,
        collapsibleMenu: [
            {
                nome: "Criar Linha",
                component: "criar-linha-component"
            },
            {
                nome: "Deletar Linha",
                component: "deletar-linha-component"
            }
        ]
    },
    {
        nome: "Serviço",
        component: "servico-linha-component"
    },
    {
        nome: "Listar Status das Portas",
        component: "status-porta-component"
    },
    {
        nome: "Manobrar",
        component: "manobrar-linha-component"
    },
    {
        nome: "Listar Status da Linha",
        component: "status-linha-component"
    }
]
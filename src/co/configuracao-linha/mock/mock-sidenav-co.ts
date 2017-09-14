import { SideNav } from './../../../viewmodel/menus/sidenav';
export const sideNavConfLinha: SideNav[] = [
    {
        nome: "Informações da Linha",
        component: "configuracao-linha-component"
    },
    // { // Sprint 2
    //     nome: "Agrupamento",
    //     component: "agrupamento-component"
    // },
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
        component: "linha-component"
    },
    {
        nome: "Serviço",
        component: "servico-linha-component"
    },    
    {
        nome: "Manobrar",
        component: "manobrar-linha-component"
    },
    {
        nome: "Listar Status das Portas",
        component: "status-porta-component"
    }
    // {
    //     nome: "Listar Status da Linha",
    //     component: "status-linha-component"
    // }
]
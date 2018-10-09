import { Injectable } from '@angular/core';
import { Mensagem } from '../../viewmodel/alertmessage/mensagem';
import { SubNav } from '../../viewmodel/subnav/subnav';
import { SideNav } from '../../viewmodel/sidenav/sidenav';

@Injectable()
export class SystemHolderService {

    /**
     * Variavel isLinkProd Deprecate Utilizar variavel (whatlink) dentro da Serviço (LinkService) para informar qual EndPoint
     */
    //public isLinkProd: boolean = true; // Valida se link é produção ou não // Deprecate
    public ableMock: boolean = false; // Habilita mock

    public mensagemAntigas: Mensagem[]; // Alerts e Toastys ocorridos na sessão do usuário

    public isAdm: boolean = false; // Valida se é ADM

    public qualCadastro: string; // Informa qual o cadastro o usuario possui CO ou CRM

    public mostraToggle: boolean = false; // Mostra toggle para realizar shuffle de CO para CRM e vice versa

    public modalWizardCadastroIsOpen: boolean = false; // Abre modal de cadastro    
    public modalInfoDMIsOpen: boolean = false; // Abre modal para inserir cadastro DM

    public clienteSoLinha: boolean = false; // Valida se cliente é so linha.

    public subnavAtivo: boolean = false; // Aqui ativa e inativa subnav
    public subNavMenus: SubNav[]; // Aqui vai o enum de subnavs
    public liberarSubNav: boolean = false; // Libera a subnav

    public sideNavAtivo: boolean = false; // Aqui ativa e inativa sidenav
    public sideNavMenus: SideNav[]; // Aqui vai o enum de sidenavs
    public liberarSideNav: boolean = false; // Libera a sidenav

    public oldToastyMessages: [{ msg: string, type: string, time: number }]; // Toasty & Mensagem passadas pelo sistema.

    public resumoInfosAtivo: boolean = false; // Mostra ou esconde as informações de resumo.
    public btnResumoInfosAtivo: boolean = false; // Mostra e esconde botão de informações de resumo.

    public qualView: string;

    public jaPesquisouAcs: boolean = false;

    public isFulltestRunning: boolean = false;
    public resultadoGlobalFulltest: boolean = false;

    public historyCertificationValidTime: number = 3600000; // <- 1800000 30 Minutos // 3600000 1 hora

    constructor() { }

}
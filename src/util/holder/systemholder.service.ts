import { Injectable } from '@angular/core';
import { Mensagem } from '../../viewmodel/alertmessage/mensagem';
import { SubNav } from '../../viewmodel/subnav/subnav';

@Injectable()
export class SystemHolderService {

    public isLinkProd: boolean = false; // Valida se link pe produção ou não
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

    public oldToastyMessages: [{ msg: string, type: string, time: number }]; // Toasty & Mensagem passadas pelo sistema.

    public liberarSubNav: boolean = false; // Libera a side nav

    public resumoInfosAtivo: boolean = false; // Mostra ou esconde as informações de resumo.
    public btnResumoInfosAtivo: boolean = false; // Mostra e esconde botão de informações de resumo.

    public qualView: string;

    constructor() { }

}
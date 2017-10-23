import { ConfPorta } from './../../viewmodel/confPorta/confPorta';
import { SubNav } from './../../viewmodel/menus/subnav';
import { SideNav } from './../../viewmodel/menus/sidenav';
import { Servico } from './../../viewmodel/cadastro-linha/servicos';
import { Ncos } from './../../viewmodel/cadastro-linha/ncos';
import { CadastroLinha } from './../../viewmodel/cadastro-linha/cadastro-linha';
import { Linha } from './../../viewmodel/cadastro/linha';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    public cadastro: Cadastro;
    public cadastroLinha: CadastroLinha;
    public objectValid: ObjectValid;
    public confPorta: ConfPorta;
    public eachFulltest: string;
    public liberarSubNav: boolean = false;
    public liberarSideNav: boolean = false;
    public listAsserts: {
        tbsradius: boolean;
        circuito: boolean;
        bloqueio: boolean;
    }
    public listResumo: {
        cadastro: boolean;
        bloqueio: boolean;
        fulltest: boolean;
    }
    public alertState: {
        msg: string,
        alertType: string,
        alertAtivo: boolean,
        alertCloseable: boolean
    }
    public whoSubNavIsActive: any;
    public whoSideNavIsActive: any;

    public listaDeNcos: Ncos[];
    public listaDeServicos: Servico[];

    public modalAdm: boolean = false;

    public modalLogError: boolean = false;
    public oldToastyMessages: [{ msg: string; type: string; }];

    public subnav: boolean = false;
    public subNavMenus: SubNav[];

    public sidenav: boolean = false;
    public sideNavMenus: SideNav[];

    constructor() { }

}
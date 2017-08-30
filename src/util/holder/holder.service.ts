import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    public cadastro: Cadastro;
    public infoLinha: InfoLinha;
    public objectValid: ObjectValid;
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
    public whoSubNavIsActive: string;
    public whoSideNavIsActive: string;

    constructor() { }

}
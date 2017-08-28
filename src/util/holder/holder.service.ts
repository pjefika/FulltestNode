import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    cadastro: Cadastro;
    infoLinha: InfoLinha;
    objectValid: ObjectValid;
    eachFulltest: string; // Se for deixar em produção retirar valores.
    liberarSubNav: boolean = false;
    liberarSideNav: boolean = false;
    listAsserts: {
        tbsradius: boolean;
        circuito: boolean;
        bloqueio: boolean;
    }
    listResumo: {
        cadastro: boolean;
        bloqueio: boolean;
        fulltest: boolean;
    }
    alertState: {
        msg: string,
        alertType: string,
        alertAtivo: boolean,
        alertCloseable: boolean
    }
    whoSubNavIsActive: string;

    constructor() { }

}
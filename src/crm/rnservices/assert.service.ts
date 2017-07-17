import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class AssertService {

    constructor() { }

    rnAsserts(cadastro: Cadastro): Promise<any> {
        let bloqueio = null;
        let tbsradius = null;
        let circuito = null;

        cadastro.asserts.forEach(element => {
            if (element.asserts == "HAS_BLOQUEIO_RADIUS") {
                bloqueio = element.value;
            }
            if (element.asserts === "DIVERGENCIA_TBS_RADIUS") {
                tbsradius = element.value;
            }
            if (element.asserts === "CIRCUITO_ATIVO") {
                circuito = element.value;
            }
        });
        let listAsserts = {
            tbsradius: tbsradius,
            circuito: circuito,
            bloqueio: bloqueio
        }        
        return Promise.resolve(listAsserts);
    }

    validaAsserts(listAsserts): Promise<any> {
        let cad: boolean = false;
        let bloc: boolean = false;
        if (!listAsserts.tbsradius && listAsserts.circuito) {
            cad = true;
        }
        if (listAsserts.bloqueio) {
            bloc = listAsserts.bloqueio;
        }
        let listResumo = {
            bloqueio: bloc,
            cadastro: cad,
            fulltest: false
        }
        return Promise.resolve(listResumo);
    }

    

}
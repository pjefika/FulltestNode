import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class MakeLogerService {

    constructor() { }

    makeLoger(msgConclusao, instancia, cadastro: Cadastro, objectValid: ObjectValid, listResumo): Promise<any> {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let inst: string = instancia;
        let desA: string = "-1";
        let des: string = "-1";
        let cust: string = "-1";
        let cad: boolean = false;
        let semBloqueio: boolean = false;
        let fulltest: boolean = false;
        let objval: string = "-1";

        if (cadastro) {
            inst = cadastro.instancia;
            desA = cadastro.designadorAcesso;
            des = cadastro.designador;
            cust = JSON.stringify(cadastro);
            cadastro = listResumo.cadastro;
            semBloqueio = !listResumo.bloqueio;
            fulltest = listResumo.fulltest;
            if (objectValid) {
                objval = JSON.stringify(objectValid);
            }
        }

        let loger = {
            instancia: inst,
            designador: des,
            designadorAcesso: desA,
            executor: usr.user,
            conclusao: msgConclusao,
            cadastro: cad,
            semBloqueio: semBloqueio,
            fulltest: fulltest,
            customer: cust,
            valids: objval
        }

        return Promise.resolve(loger);
    }
}
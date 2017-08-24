import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracaoLinhaService {

    constructor() { }

    public getInformacoes(): InfoLinha {
        let info: InfoLinha;
        info = {
            central: "PRCTA_PVS01(2)",
            ip: "10.141.245.97",
            facilidade: "CTAC 50 6 00 85",
            detalhes: "CUSTGRP: CTA_POS NCOS:115"
        }
        return info;
    }

}
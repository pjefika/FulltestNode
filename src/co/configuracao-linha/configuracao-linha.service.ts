import { InfoLinha } from './../../viewmodel/cadastro-linha/infolinha';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracaoLinhaService {

    constructor() { }

    public getLstComandos(): string[] {
        let listComandos: string[] = [];
        listComandos.push("Ativar Agrupamento");
        listComandos.push("Desativar Agrupamento");
        listComandos.push("Consultar Agrupamento");
        listComandos.push("Alterar CUSTGROUP");
        listComandos.push("Alterar NCOS");
        listComandos.push("Criar Linha");
        listComandos.push("Deletar Linha");
        listComandos.push("Ativar Serviço");
        listComandos.push("Desativar Serviço");
        listComandos.push("Listar Status da Portas");
        listComandos.push("Manobrar");
        listComandos.push("Status da Linha");
        return listComandos;
    }

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
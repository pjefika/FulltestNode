import { Valids } from './validacao';
import { Cadastro } from 'viewmodel/cadastro/cadastro';

export class ObjectValid {
    valids: Valids[];
    dataInicio: number;
    dataFim: number;
    mensagem: string;
    resultado: boolean;
    cl?: Cadastro;
}
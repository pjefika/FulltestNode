import { Linha } from './linha';
import { Asserts } from './asserts';
import { Rede } from "./rede";
import { Servicos } from "./servicos";

export class Cadastro {
    designador: string;
    instancia: string;
    designadorAcesso: string;
    rede: Rede;
    servicos: Servicos;
    asserts: Asserts[];
    linha: Linha;
}
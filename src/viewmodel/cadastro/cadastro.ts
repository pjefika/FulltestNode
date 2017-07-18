import { Asserts } from './asserts';
import { Rede } from "./rede";
import { Servicos } from "./servicos";

export class Cadastro {
    id: number;
    designador: string;
    instancia: string;
    designadorAcesso: string;
    rede: Rede;
    servicos: Servicos;
    asserts: Asserts[];
}
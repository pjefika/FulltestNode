import { Linha } from './linha';
import { Asserts } from './asserts';
import { Rede } from "./rede";
import { Servicos } from "./servicos";
import { Radius } from 'viewmodel/cadastro/radius';

export class Cadastro {
    designador: string;
    instancia: string;
    designadorAcesso: string;
    rede: Rede;
    radius?: Radius;
    servicos: Servicos;
    asserts: Asserts[];
    linha: Linha;
}
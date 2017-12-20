import { Linha } from './linha';
import { Asserts } from './asserts';
import { Rede } from "./rede";
import { Servicos } from "./servicos";
import { Radius } from 'viewmodel/cadastro/radius';
import { EventoMassivo } from 'viewmodel/evento-massivo/evento-massivo';

export class Cadastro {
    designador: string;
    instancia: string;
    designadorAcesso: string;
    rede: Rede;
    radius?: Radius;
    servicos: Servicos;
    asserts: Asserts[];
    linha: Linha;
    eventos?: EventoMassivo[];
}
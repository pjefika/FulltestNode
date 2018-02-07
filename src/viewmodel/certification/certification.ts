import { Cadastro } from "viewmodel/cadastro/cadastro";

export class Certification {
    resultado: string;
    orientacao: string;
    id: string;
    dataInicio: number;
    dataFim: number;
    executor: string;
    customer: Cadastro;
}
import { Analise } from "./analise";
import { Motivo } from "./motivo";
import { Conclusao } from "./conclusao";

export class Analitico {
    manobrar: boolean;
    analises: Analise[];
    conclusao: { motivo: Motivo, conclusao: Conclusao }
}
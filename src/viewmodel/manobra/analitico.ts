import { Motivo } from './motivo';
import { Conclusao } from './conclusao';
import { Analises } from './analises';
export class Analitico {
    analises: Analises[];
    manobrar: boolean;
    conclusao: { motivo: Motivo, conclusao: Conclusao }
}
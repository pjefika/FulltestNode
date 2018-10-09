import { Customer } from "../customer/customer";
import { Analitico } from "./analitico";

export class ListManobraCertification {
    id: string;
    instancia: string;
    designador: string;
    designadorAcesso: string;
    executor: string;
    customer: Customer;
    manobrar: boolean;
    motivoSaida: string;
    motivoEntrada: string;
    analise: Analitico;
    dataHora: number;

}
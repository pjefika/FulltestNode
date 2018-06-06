import { Fulltest } from "../fulltest/fulltest";
import { Customer } from "../customer/customer";
import { Block } from "../block/block";

export class Certification {
    resultado: string;
    orientacao: string;
    id: string;
    blocks: Block[];
    dataInicio: number;
    dataFim: number;
    customer: Customer;
    executor: string;
    fulltest?: Fulltest;
    system?: string;
    fkId: string;
    final?: string = "N/A";
}
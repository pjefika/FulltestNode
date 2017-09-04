import { Servico } from './servicos';
export class CadastroLinha {
    dn: string;
    len: string;
    custGrp: string;
    subGrp: string;
    ncos: number;
    status: string;
    servicos: Servico[];
}
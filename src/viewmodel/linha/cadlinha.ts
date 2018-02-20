import { Len } from "./len";
import { Ncos } from "./ncos";
import { ServicoLinha } from "./servicolinha";

export class CadastroLinha {
    dn: string;
    len: Len;
    custGrp: string;
    subGrp: string;
    ncos: Ncos;
    status: string;
    servicos: ServicoLinha[];
}
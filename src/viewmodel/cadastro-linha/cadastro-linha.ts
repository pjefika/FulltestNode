import { Ncos } from './ncos';
import { Len } from './len';
import { Servico } from './servicos';
export class CadastroLinha {
    dn: string;
    len: Len;
    custGrp: string;
    subGrp: string;
    ncos: Ncos;
    status: string;
    servicos: Servico[];
}
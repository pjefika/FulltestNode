import { Asserts } from './asserts';
import { Rede } from "./rede";
import { Servicos } from "./servicos";

export class Cadastro {
    id: number;
    designador: string;
    instancia: string;
    designadorAcesso: string;
    rede: Rede;
    servicos: Servicos;
    asserts: Asserts[];

    errocadastro(): boolean {
        this.asserts.forEach(as => {
           
        });
        return false;
    }

}

// if (as.asserts === "HAS_BLOQUEIO_RADIUS" && as.value === false) {
//     //Faz algo
// }
// if (as.asserts === "DIVERGENCIA_TBS_RADIUS" && as.value === false) {
//     //Faz algo
// }
// if (as.asserts === "CIRCUITO_ATIVO" && as.value === true) {
//     //Faz algo
// }
import { Rede } from "../cadastro/rede";
import { RedeExterna } from "../cadastro/redeexterna";
import { Servico } from "../cadastro/servico";
import { Linha } from "../cadastro/linha";
import { Radius } from "../cadastro/radius";
import { Assert } from "../asserts/assert";
import { Evento } from "../evento/evento";

export class Customer {
    designador: string;
    instancia: string;
    designadorAcesso: string;
    designadorTv: string;
    rede: Rede;
    redeExterna: RedeExterna;
    servicos: Servico;
    linha: Linha;
    radius: Radius;
    asserts: Assert[];
    eventos: Evento[];
}
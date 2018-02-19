import { BlockName } from "./blockname";
import { Assert } from "../asserts/assert";

export class Block {
    resultado: string;
    orientacao: string;
    asserts: Assert[];
    nome: BlockName;
}
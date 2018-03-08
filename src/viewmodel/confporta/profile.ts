import { Valid } from "../valid/valid";
import { VelValues } from "./velvalues";

export class Profile {
    atual: Valid;
    downValues?: VelValues[];
    upValues?: VelValues[];
}
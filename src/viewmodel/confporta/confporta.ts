import { Valid } from "../valid/valid";
import { Profile } from "./profile";

export class ConfPorta {
    estadoPorta: Valid;
    vlanBanda: Valid;
    vlanVoip: Valid;
    vlanVod: Valid;
    vlanMulticast: Valid;
    parametros: Valid;
    profile: Profile;
    tabRede: Valid;
}
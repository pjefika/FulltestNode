import { Parametros } from './parametros';
import { SerialDisponivel } from './serialDisponivel';
import { Serial } from './serial';
import { Profile } from './profiles';
import { VlanMulticast } from './vlanMulticast';
import { VlanVod } from './vlanVod';
import { VlanVoip } from './vlanVoip';
import { VlanBanda } from './vlanBanda';
import { EstadoPorta } from './estadoPorta';
export class ConfPorta {
    estadoPorta: EstadoPorta;
    vlanBanda: VlanBanda;
    vlanVoip: VlanVoip;
    vlanVod: VlanVod;
    vlanMulticast: VlanMulticast;
    profile: Profile;
    serial: Serial;
    serialDisp: SerialDisponivel[];
    parametros: Parametros;
}
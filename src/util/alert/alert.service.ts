import { Injectable } from '@angular/core';
import { Mensagem } from '../../viewmodel/alertmessage/mensagem';
import { Toasty } from '../../viewmodel/alertmessage/toasty';
import { ToastyComponent } from '../../util-components/toasty/toasty.component';

@Injectable()
export class AlertService {

    public ativo: boolean = false;
    public mensagem: Mensagem;

    constructor(public toastyComponent: ToastyComponent) { }

    public callAlert(alertType: string, alertMsg: string) {        
        this.mensagem = {
            type: alertType,
            msg: alertMsg
        }
        this.ativo = true;
    }

    public callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}
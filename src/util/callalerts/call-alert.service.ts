import { Injectable } from '@angular/core';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Injectable()
export class CallAlertService {

    public alertAtivo: boolean;
    public msg: { alertType: string, msg: string };

    constructor(public toastyComponent: ToastyComponent) { }

    public callAlert(alertAtivo: boolean, alertType: string, alertMsg: string) {
        this.msg = {
            alertType: alertType,
            msg: alertMsg
        }
        this.alertAtivo = alertAtivo;
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
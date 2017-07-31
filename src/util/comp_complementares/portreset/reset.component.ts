import { HolderService } from './../../holder/holder.service';
import { Router } from '@angular/router';
import { Util } from './../../util';
import { ResetService } from './reset.service';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'port-reset-component',
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css']
})

export class ResetComponent implements OnInit {

    @Input() cadastro: Cadastro;

    modalActive: boolean = false;
    btnResetActive: boolean = false;
    btnLoading: boolean = false;

    result: boolean = false;

    alertMsg: {
        msg: string;
        alertType: string;
    }
    alertAtivo: boolean = false;
    alertCloseable: boolean = true;

    constructor(
        private util: Util,
        private router: Router,
        private resetService: ResetService,
        private holderService: HolderService) { }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }

    reset() {
        this.modalActive = false;
        this.btnResetActive = true;
        this.btnLoading = true;

        setTimeout(() => {
            this.btnLoading = false;
            this.btnResetActive = false;

            this.result = true; // Simulador resultado true ou false para o reset...

            if (this.result) {
                this.callAlert("Modem resetado com sucesso, aguarde o modem subir.", "alert-success");
            } else {
                this.callAlert("Erro ao realizar reset do modem.", "alert-danger");
            }

        }, 3000);
    }

    callAlert(msg, type) {
        this.alertMsg = {
            msg: msg,
            alertType: type
        }
        this.alertAtivo = true;
        this.alertCloseable = false;

        this.holderService.alertState = {
            msg: msg,
            alertType: type,
            alertAtivo: true,
            alertCloseable: false
        }
    }

}
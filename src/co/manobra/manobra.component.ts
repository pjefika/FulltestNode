import { HolderService } from './../../util/holder/holder.service';
import { Util } from './../../util/util';
import { Router } from '@angular/router';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'manobra-component',
    templateUrl: 'manobra.component.html',
    styleUrls: ['manobra.component.css']
})

export class ManobraComponent implements OnInit {

    cadastro: Cadastro;
    btnValidDisable: boolean = false;
    validManobra: [{ msg: string, inf: boolean }]; // Fazer variavel na holder para segurar estado da pagina...
    searchingValids: boolean = false;

    alertMsg: {
        msg: string;
        alertType: string;
    }
    alertAtivo: boolean = false;
    alertCloseable: boolean = true;

    constructor(
        private router: Router,
        private util: Util,
        private injector: Injector,
        private holderService: HolderService) {
        this.cadastro = this.injector.get('cadastro');
    }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        if (this.holderService.cadastro) {
            this.holderAtribuition();
        }
    }

    validar() {
        this.alertAtivo = false;
        this.btnValidDisable = true;
        this.searchingValids = true;
        this.mock();
    }

    mock() {
        let test2 = { msg: "Teste 2...", inf: true }
        let test3 = { msg: "Teste 3...", inf: true }
        let test4 = { msg: "Teste 4...", inf: true }

        this.validManobra = [{ msg: "Teste 1", inf: true }]

        setTimeout(() => {
            this.validManobra.push(test2);
            setTimeout(() => {
                this.validManobra.push(test3);
                setTimeout(() => {
                    this.validManobra.push(test4);
                    this.btnValidDisable = false;
                    this.searchingValids = false;
                    this.callAlert("Eu Aprovo... ", "alert-success");
                }, 1500);
            }, 1500);
        }, 1500);
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

    holderAtribuition() {
        this.cadastro = this.holderService.cadastro;
        if (this.holderService.alertState) {
            this.alertMsg = {
                msg: this.holderService.alertState.msg,
                alertType: this.holderService.alertState.alertType
            }
            this.alertAtivo = this.holderService.alertState.alertAtivo;
            this.alertCloseable = this.holderService.alertState.alertCloseable;
        }

    }
}
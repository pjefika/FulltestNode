import { FormsModule } from '@angular/forms';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { ManobraService } from './manobra.service';
import { HolderService } from './../../util/holder/holder.service';
import { Util } from './../../util/util';
import { Router } from '@angular/router';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Component, OnInit, Injector, Input } from '@angular/core';

@Component({
    selector: 'manobra-component',
    templateUrl: 'manobra.component.html',
    styleUrls: ['manobra.component.css']
})

export class ManobraComponent implements OnInit {

    cadastro: Cadastro;
    objectValid: ObjectValid;
    @Input() ordem: string;
    btnValidDisable: boolean = true;
    validManobra: boolean = false;
    listValidManobra: [{ msg: string, inf: boolean }]; // Fazer variavel na holder para segurar estado da pagina...
    searchingValids: boolean = false;
    searchFulltest: boolean = false;
    doFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

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
        private holderService: HolderService,
        private manobraService: ManobraService,
        private toastyComponent: ToastyComponent) {
        this.cadastro = this.injector.get('cadastro');
    }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.holderAtribuition();
        if (this.cadastro && !this.objectValid) {
            this.realizaFulltest();
        } else {
            if (this.objectValid.resultado) {
                this.validManobra = true;
            }
        }
    }

    //Realiza fulltest ao entrar na pagina...
    realizaFulltest(): void {
        this.searchFulltest = true;
        this.manobraService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.holderService.objectValid = this.objectValid;
                this.searchFulltest = false;
                if (this.objectValid.resultado) {
                    this.validManobra = true;
                    this.callAlert(this.objectValid.mensagem, "alert-success");
                } else {                    
                    this.callAlert(this.objectValid.mensagem, "alert-danger");
                }
            }, error => {
                this.searchFulltest = false;
                if (error.tError !== "Timeout") {
                    this.doFulltest = true;
                }
                this.toastyInfo = {
                    titulo: "Ops, ocorreu um erro.",
                    msg: error.mError,
                    theme: "error"
                }
                this.toastyComponent.toastyInfo = this.toastyInfo;
                this.toastyComponent.addToasty();
            })
    }

    validar() {
        if (this.ordem) {
            this.alertAtivo = false;
            this.btnValidDisable = true;
            this.searchingValids = true;
            this.mock();
        } else {
            console.log("Por favor insira a ordem");
        }
    }

    mock() {
        let test2 = { msg: "Teste 2...", inf: true }
        let test3 = { msg: "Teste 3...", inf: true }
        let test4 = { msg: "Teste 4...", inf: true }

        this.listValidManobra = [{ msg: "Teste 1", inf: true }]

        setTimeout(() => {
            this.listValidManobra.push(test2);
            setTimeout(() => {
                this.listValidManobra.push(test3);
                setTimeout(() => {
                    this.listValidManobra.push(test4);
                    this.btnValidDisable = false;
                    this.searchingValids = false;
                    this.callAlert("Eu Aprovo... ", "alert-success");
                    //this.callAlert("Eu Não Aprovo... ", "alert-danger");
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
        this.objectValid = this.holderService.objectValid;
        if (this.holderService.alertState) {
            this.alertMsg = {
                msg: this.holderService.alertState.msg,
                alertType: this.holderService.alertState.alertType
            }
            this.alertAtivo = this.holderService.alertState.alertAtivo;
            this.alertCloseable = this.holderService.alertState.alertCloseable;
        }
    }

    enterBtnInput() {
        if (!this.ordem) {
            this.btnValidDisable = true;
        } else {
            this.btnValidDisable = false;
        }
    }

}
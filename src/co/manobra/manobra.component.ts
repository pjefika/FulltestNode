import { Analitico } from './../../viewmodel/manobra/analitico';
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
    listAnalitico: Analitico[]; // Está vai ser a variavel...
    @Input() ordem: string;
    btnValidDisable: boolean = true;
    validManobra: boolean = false;
    searchingValids: boolean = false;
    searchFulltest: boolean = false;
    doFulltest: boolean = false;
    nameBtnValidManobra = "Validar Manobra";

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
        if (this.cadastro) {
            this.realizaFulltest();
        }
    }

    //Realiza fulltest ao entrar na pagina...
    realizaFulltest(): void {
        this.alertAtivo = false;
        this.searchFulltest = true;
        this.manobraService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
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

    validar() { // Realizar RN ao clicar no botão validar...
        if (this.ordem) {
            this.btnValidDisable = true;
            this.searchingValids = true;
            this.nameBtnValidManobra = "Validando Manobra";
            this.manobraService
                .getRn(this.cadastro, this.ordem)
                .subscribe(data => {
                    this.cadastro = data;
                    this.manobraService
                        .getAnalitico(this.cadastro)
                        .then(data => {
                            this.listAnalitico = data;
                            this.searchingValids = false;
                            this.nameBtnValidManobra = "Manobra Validada";
                        }, error => {
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
                        });
                }, error => {
                    this.toastyInfo = {
                        titulo: "Ops, ocorreu um erro.",
                        msg: error.mError,
                        theme: "error"
                    }
                    this.toastyComponent.toastyInfo = this.toastyInfo;
                    this.toastyComponent.addToasty();
                });
        }
    }

    callAlert(msg, type) {
        this.alertMsg = {
            msg: msg,
            alertType: type
        }
        this.alertAtivo = true;
        this.alertCloseable = false;
    }

    holderAtribuition() {
        this.cadastro = this.holderService.cadastro;
    }

    enterBtnInput() {
        if (!this.ordem) {
            this.btnValidDisable = true;
        } else {
            this.btnValidDisable = false;
        }
    }

}
import { element } from 'protractor';
import { Motivo } from './../../viewmodel/manobra/motivo';
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

    @Input() public ordem: string;

    private cadastro: Cadastro;
    private objectValid: ObjectValid;
    private analitico: Analitico;

    private motivos: Motivo[];
    private motivoSelected: string;

    private btnValidDisable: boolean = true;

    private validManobra: boolean = false;
    private validedManobra: boolean = false;

    private searchingValids: boolean = false;
    private searchFulltest: boolean = false;

    private doFulltest: boolean = false;

    private nameBtnValidManobra = "Validar Manobra";

    public toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    public alertMsg: {
        msg: string;
        alertType: string;
    }
    public alertAtivo: boolean = false;
    public alertCloseable: boolean = true;

    public subalertMsg: {
        msg: string;
        alertType: string;
    }
    public subalertAtivo: boolean = false;
    public subalertCloseable: boolean = true;

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
                this.router.navigate(['./entrar']);
            }
        });
        this.holderAtribuition();
        if (this.cadastro) {
            this.realizaFulltest();
            this.getListaMotivo();
        }
    }

    //Realiza fulltest ao entrar na pagina...
    public realizaFulltest(): void {
        this.alertAtivo = false;
        this.searchFulltest = true;
        this.manobraService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
                if (this.objectValid.resultado) {
                    this.validManobra = true;
                } else {
                    this.callAlert(this.objectValid.mensagem, "alert-danger");
                }
            }, error => {
                this.searchFulltest = false;
                if (error.tError !== "Timeout") {
                    this.doFulltest = true;
                }
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
            })
    }

    public validar() {
        if (this.ordem && this.motivoSelected) {
            this.btnValidDisable = true;
            this.searchingValids = true;
            this.nameBtnValidManobra = "Validando Manobra";
            let usr = JSON.parse(sessionStorage.getItem('user'));
            this.manobraService
                .getRn(this.cadastro, this.ordem)
                .subscribe(data => {
                    this.cadastro = data;
                    this.manobraService
                        .getAnalitico(this.cadastro, this.motivoSelected, usr.user)
                        .then(data => {
                            this.analitico = data;
                            this.searchingValids = false;
                            this.validedManobra = true;
                            this.nameBtnValidManobra = "Validar Manobra";
                            if (this.analitico.manobrar) {
                                let _manobraMotivo = "Liberar manobra - " + this.analitico.conclusao.conclusao.frase + ": " + this.analitico.conclusao.motivo.motivo;
                                this.callAlert(_manobraMotivo, "alert-success");
                            } else {
                                let _manobraMotivo = "Manobra negada - Conclusão: " + this.analitico.conclusao.conclusao.frase;
                                this.callAlert(_manobraMotivo, "alert-danger");
                            }
                            this.subAlertMessage();
                        }, error => {
                            this.nameBtnValidManobra = "Validar Manobra";
                            this.btnValidDisable = false;
                            this.searchingValids = false;
                            this.eraseInfoValid();
                            this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                        });
                }, error => {
                    let jError = error.json();
                    this.btnValidDisable = false;
                    this.searchingValids = false;
                    this.eraseInfoValid();
                    this.nameBtnValidManobra = "Validar Manobra";
                    this.callToasty("Ops, ocorreu um erro.", jError.message, "error", 5000);
                });
        } else {
            this.callToasty("Ops, ocorreu um erro.", "Por favor preencha os campos", "error", 5000);
        }
    }

    public getListaMotivo() {
        this.manobraService
            .getListaMotivo()
            .then(data => {
                this.motivos = data;
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public subAlertMessage() {
        this.holderService.cadastro.asserts.forEach(element => {
            if (element.asserts === "REDE_CONFIAVEL") {
                let msg: string;
                let type: string;
                if (element.value) {
                    msg = "Rede confiável. ";
                    type = "alert-info";
                } else {
                    msg = "Rede não confiável, necessária revisão.";
                    type = "alert-warning";
                }
                this.subalertMsg = {
                    msg: msg,
                    alertType: type
                }
                this.subalertAtivo = true;
                this.subalertCloseable = false;
            }
        });
    }

    public callAlert(msg, type) {
        this.alertMsg = {
            msg: msg,
            alertType: type
        }
        this.alertAtivo = true;
        this.alertCloseable = false;
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    public holderAtribuition() {
        this.cadastro = this.holderService.cadastro;
    }

    public enterBtnInput() {
        if (!this.ordem && !this.motivoSelected) {
            this.btnValidDisable = true;
        } else {
            this.btnValidDisable = false;
        }
    }

    public eraseInfoValid() {
        this.ordem = null;
        this.motivoSelected = null;
    }

}
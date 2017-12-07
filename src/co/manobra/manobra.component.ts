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
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'manobra-component',
    templateUrl: 'manobra.component.html',
    styleUrls: ['manobra.component.css']
})

export class ManobraComponent extends CallAlertService implements OnInit {

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
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
        this.cadastro = this.holderService.cadastro;
    }

    public ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
        this.holderAtribuition();
        if (this.cadastro) {
            if (this.holderService.objectValid) {
                this.objectValid = this.holderService.objectValid;
                this.infoOVResult();
            } else {
                this.realizaFulltest();
            }
            this.getListaMotivo();
        }
        // this.holderService.resumoInfosAtivo = true;
        this.holderService.btnResumoInfosAtivo = true;
    }

    //Realiza fulltest ao entrar na pagina...
    public realizaFulltest(): void {
        this.alertAtivo = false;
        this.searchFulltest = true;
        this.validManobra = false;
        this.manobraService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.holderService.objectValid = this.objectValid;
                this.searchFulltest = false;
                this.infoOVResult();
            }, error => {
                this.searchFulltest = false;
                if (error.tError !== "Timeout") {
                    this.doFulltest = true;
                }
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error");
            })
    }

    private infoOVResult() {
        if (this.objectValid.resultado) {
            this.validManobra = true;
        } else {
            super.callAlert(true, "alert-danger", this.objectValid.mensagem);
        }
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
                                super.callAlert(true, "alert-success", _manobraMotivo);
                            } else {
                                let _manobraMotivo = "Manobra negada - Conclusão: " + this.analitico.conclusao.conclusao.frase;
                                super.callAlert(true, "alert-danger", _manobraMotivo);
                            }
                            //this.subAlertMessage();
                        }, error => {
                            this.nameBtnValidManobra = "Validar Manobra";
                            this.btnValidDisable = false;
                            this.searchingValids = false;
                            this.eraseInfoValid();
                            super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                        });
                }, error => {
                    let jError = error.json();
                    this.btnValidDisable = false;
                    this.searchingValids = false;
                    this.eraseInfoValid();
                    this.nameBtnValidManobra = "Validar Manobra";
                    super.callToasty("Ops, ocorreu um erro.", jError.message, "error", 5000);
                });
        } else {
            super.callToasty("Ops, ocorreu um erro.", "Por favor preencha os campos", "error", 5000);
        }
    }

    public getListaMotivo() {
        this.manobraService
            .getListaMotivo()
            .then(data => {
                this.motivos = data;
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
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
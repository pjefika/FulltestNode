import { MakeLogerService } from './../rnservices/makeloger.service';
import { AssertService } from './../rnservices/assert.service';
import { HolderService } from './../../util/holder/holder.service';
import { LogerService } from './../../util/loger/loger.service';
import { Util } from './../../util/util';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { Loger } from './../../viewmodel/loger/loger';
import { Resumo } from './../../viewmodel/fulltest/tabelaresumo';
import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';

import { FulltestCrmService } from './../fulltestcrm/fulltestcrm.service';
import { element } from 'protractor';
import { CadastroCrmService } from './cadastrocrm.service';
import { Router } from '@angular/router';
import { Component, OnInit, Injector } from '@angular/core';
import { log } from 'util';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'cadastro-crm-component',
    templateUrl: 'cadastrocrm.component.html',
    styleUrls: ['cadastrocrm.component.css'],
    providers: [AssertService, MakeLogerService]
})

export class CadastroCrmComponent extends CallAlertService implements OnInit {

    private cadastro: Cadastro;
    private objectValid: ObjectValid;
    private instancia: string;
    private resumo: Resumo;

    private searchCadastro: boolean = false;
    private searchFulltest: boolean = false;
    private doFulltest: boolean = false;

    private listAsserts: {
        tbsradius: boolean;
        circuito: boolean;
        bloqueio: boolean;
    }

    private listResumo: {
        cadastro: boolean;
        bloqueio: boolean;
        fulltest: boolean;
    }

    private loger: Loger;

    private abreModal: boolean = false;

    private msgEventoMassivo: any;
    private alertAtivoEventoMassivo: boolean = false;

    constructor(
        private cadastroCrmService: CadastroCrmService,
        public toastyComponent: ToastyComponent,
        private util: Util,
        private router: Router,
        private injector: Injector,
        private fulltestCrmService: FulltestCrmService,
        private logerService: LogerService,
        private holderService: HolderService,
        private assertService: AssertService,
        private makeLogerService: MakeLogerService) {
        super(toastyComponent);
        this.instancia = this.holderService.instancia;
    }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
        if (this.holderService.cadastro) {
            this.cadastro = this.holderService.cadastro;
            this.holderAtribuition();
        } else {
            //Inicia o fulltest assim que inicializa o componente
            this.getCadastro();
        }
        this.holderService.resumoInfosAtivo = false;
        this.holderService.btnResumoInfosAtivo = false;
    }

    //Busca instancia retornando cadastro.
    public getCadastro() {
        //this.holderService.liberarSubNav = true;
        this.searchCadastro = true;
        this.cadastroCrmService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.holderService.cadastro = this.cadastro;
                this.searchCadastro = false;
                this.assert();
                this.holderService.liberarSubNav = true;
            }, error => {
                this.searchCadastro = false;
                this.mloger(error.mError);
                if (error.mError == "Erro de Cadastro - Circuito não assinalado no TBS.") {
                    let msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente."
                    super.callAlert(true, "alert-danger", msgalerterror);
                    this.setmsginholder(msgalerterror, "alert-danger");
                } else {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                }
            });
    }

    //Faz validações com o cadastro buscado.
    public getValidacao() {
        this.abreModal = false; // Desliga modal de pergunta massivo...
        //Retirar quando tiver em produção....
        // delete this.cadastro.radius;
        // delete this.cadastro.eventos;
        this.searchFulltest = true;
        this.fulltestCrmService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.holderService.objectValid = this.objectValid;
                this.searchFulltest = false;
                this.listResumo.fulltest = this.objectValid.resultado;
                if (this.listResumo.fulltest) {
                    super.callAlert(true, "alert-success", this.objectValid.mensagem);
                    this.setmsginholder(this.objectValid.mensagem, "alert-success");
                } else {
                    super.callAlert(true, "alert-danger", this.objectValid.mensagem);
                    this.setmsginholder(this.objectValid.mensagem, "alert-danger");
                }
                this.mloger(this.objectValid.mensagem);
            }, error => {
                super.callAlert(true, "alert-danger", error.mError);
                this.setmsginholder(error.mError, "alert-danger");
                this.listResumo.fulltest = false;
                this.searchFulltest = false;
                this.mloger(error.mError);
                //this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
            });
    }

    private setmsginholder(msg, type) {
        this.holderService.alertState = {
            msg: msg,
            alertType: type,
            alertAtivo: true,
            alertCloseable: false
        }
    }

    /**
    * Validações dos Asserts para a lista de resumo.
    */
    public assert() {
        this.assertService
            .rnAsserts(this.cadastro)
            .then(data => {
                this.listAsserts = data;
                this.holderService.listAsserts = this.listAsserts;
                this.assertService
                    .validaAsserts(this.listAsserts)
                    .then(data => {
                        this.listResumo = data;
                        this.holderService.listResumo = this.listResumo;
                        let msgalerterror: string;
                        if (this.listResumo.cadastro) {
                            if (this.cadastro.eventos.length > 0) {
                                // Validação se continua ou não o fulltest...
                                this.abreModal = true;
                                this.alertAtivoEventoMassivo = true;
                                this.msgEventoMassivo = { alertType: "alert-warning", msg: "Cliente com evento massivo, podem ocorrer erros em algumas correções e/ou validações." };
                            } else {
                                this.getValidacao();
                                if (this.cadastro.rede.planta == "VIVO1") {
                                    this.msgEventoMassivo = { msg: "Não há evento massivo para este cliente.", alertType: "alert-info" }
                                    this.alertAtivoEventoMassivo = true;
                                }
                            }
                        } else {
                            msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente.";
                            super.callAlert(true, "alert-danger", msgalerterror);
                            this.setmsginholder(msgalerterror, "alert-danger");
                        }
                        if (this.listResumo.bloqueio) {
                            msgalerterror = "Cliente com BLOQUEIO, por favor seguir fluxo GPS relacionado a validação de Bloqueios";
                            super.callAlert(true, "alert-danger", msgalerterror);
                            this.setmsginholder(msgalerterror, "alert-danger");
                        }
                        this.mloger(msgalerterror);
                    });
            });
    }

    /*
    * Loger... 
    */
    private mloger(msgConclusao) {
        this.makeLogerService
            .makeLoger(msgConclusao, this.instancia, this.cadastro, this.objectValid, this.listResumo)
            .then(data => {
                this.loger = data;
                this.logerService.makeLog(this.loger)
                    .then(data => {
                        //console.log("Log realizado com sucesso.");
                    }, error => {
                        console.log("Erro ao fazer log da ação.")
                    });
            })
    }

    private holderAtribuition() {
        if (this.holderService.listAsserts && this.holderService.listResumo) {
            this.listAsserts = this.holderService.listAsserts;
            this.listResumo = this.holderService.listResumo;
        } else {
            this.assert();
        }
        if (this.holderService.objectValid) {
            this.objectValid = this.holderService.objectValid;
        } else {
            this.assert();
        }
        if (this.holderService.alertState) {
            this.msg = {
                alertType: this.holderService.alertState.alertType,
                msg: this.holderService.alertState.msg
            }
            this.alertAtivo = this.holderService.alertState.alertAtivo;
        }
    }
}
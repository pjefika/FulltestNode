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

@Component({
    selector: 'cadastro-crm-component',
    templateUrl: 'cadastrocrm.component.html',
    styleUrls: ['cadastrocrm.component.css'],
    providers: [AssertService, MakeLogerService]
})

export class CadastroCrmComponent implements OnInit {

    cadastro: Cadastro;
    objectValid: ObjectValid;
    instancia: string;
    resumo: Resumo;

    searchCadastro: boolean = false;
    searchFulltest: boolean = false;
    doFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    listAsserts: {
        tbsradius: boolean;
        circuito: boolean;
        bloqueio: boolean;
    }

    listResumo: {
        cadastro: boolean;
        bloqueio: boolean;
        fulltest: boolean;
    }

    alertMsg: {
        msg: string;
        alertType: string;
    }
    alertAtivo: boolean = false;
    alertCloseable: boolean = true;

    loger: Loger;

    constructor(
        private cadastroCrmService: CadastroCrmService,
        private toastyComponent: ToastyComponent,
        private util: Util,
        private router: Router,
        private injector: Injector,
        private fulltestCrmService: FulltestCrmService,
        private logerService: LogerService,
        private holderService: HolderService,
        private assertService: AssertService,
        private makeLogerService: MakeLogerService) {
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
                if (this.cadastro.rede.tipo) {
                    this.searchCadastro = false;
                    this.assert();
                } else {
                    this.searchCadastro = true;
                    this.cadastroCrmService
                        .getCadastroDOne(this.instancia)
                        .then(data => {
                            this.cadastro.rede = data.rede;
                            this.callAlert("Atenção cadastro carregado da base do dia anterior.", "alert-danger");
                            this.searchCadastro = false;
                            this.assert();
                        }, error => {
                            this.callAlert("Atenção não existe informações de cadastro em nossas bases.", "alert-danger");
                            this.searchCadastro = false;
                        });
                }
                this.holderService.liberarSubNav = true;
            }, error => {
                this.searchCadastro = false;
                this.mloger(error.mError);
                if (error.mError == "Erro de Cadastro - Circuito não assinalado no TBS.") {
                    let msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente."
                    this.callAlert(msgalerterror, "alert-danger");
                } else {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                }
            });
    }

    //Faz validações com o cadastro buscado.
    public getValidacao() {
        this.searchFulltest = true;
        this.fulltestCrmService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.holderService.objectValid = this.objectValid;
                this.searchFulltest = false;
                this.listResumo.fulltest = this.objectValid.resultado;
                if (this.listResumo.fulltest) {
                    this.callAlert(this.objectValid.mensagem, "alert-success");
                } else {
                    this.callAlert(this.objectValid.mensagem, "alert-danger");
                }
                this.mloger(this.objectValid.mensagem);
            }, error => {
                this.callAlert(error.mError, "alert-danger");
                this.listResumo.fulltest = false;
                this.searchFulltest = false;
                this.mloger(error.mError);
                //this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
            });
    }
    /*
    *  Chamadas para infos na tela Toasty e Alert 
    */
    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    private callAlert(msg, type) {
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
                            this.getValidacao();
                        } else {
                            msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente.";
                            this.callAlert(msgalerterror, "alert-danger");
                        }
                        if (this.listResumo.bloqueio) {
                            msgalerterror = "Cliente com BLOQUEIO, por favor seguir fluxo GPS relacionado a validação de Bloqueios";
                            this.callAlert(msgalerterror, "alert-danger");
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
        // console.log(this.holderService.listAsserts);
        // console.log(this.holderService.listResumo);
        // console.log(this.holderService.objectValid);


        // this.listAsserts = this.holderService.listAsserts;
        // this.listResumo = this.holderService.listResumo;
        // this.objectValid = this.holderService.objectValid;

        // if (this.holderService.listAsserts || this.holderService.listResumo || this.holderService.objectValid) {
        //     this.listAsserts = this.holderService.listAsserts;
        //     this.listResumo = this.holderService.listResumo;
        //     this.objectValid = this.holderService.objectValid;
        // } else {
        //     this.assert();
        // }

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
            this.alertMsg = {
                msg: this.holderService.alertState.msg,
                alertType: this.holderService.alertState.alertType
            }
            this.alertAtivo = this.holderService.alertState.alertAtivo;
            this.alertCloseable = this.holderService.alertState.alertCloseable;
        }
    }
}
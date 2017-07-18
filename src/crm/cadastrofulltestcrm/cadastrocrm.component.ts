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
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        if (this.holderService.cadastro) {
            this.holderAtribuition();
        } else {
            //Inicia o fulltest assim que inicializa o componente
            this.getCadastro();
        }
    }

    //Busca instancia retornando cadastro.
    getCadastro() {
        this.searchCadastro = true;
        this.cadastroCrmService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.holderService.cadastro = this.cadastro;
                this.searchCadastro = false;
                this.assert();
            }, error => {
                this.searchCadastro = false;
                this.mloger(error.mError);
                if (error.mError == "Erro de Cadastro - Circuito não assinalado no TBS.") {
                    let msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente."
                    this.callAlert(msgalerterror, "alert-danger");
                } else {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                }
            });
    }

    //Faz validações com o cadastro buscado.
    getValidacao() {
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
                this.holderService.liberarSubNav = true;
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
    callToasty(titulo, msg, theme) {
        this.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.toastyInfo = this.toastyInfo;
        this.toastyComponent.addToasty();
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

    /**
    * Validações dos Asserts para a lista de resumo.
    */
    assert() {
        this.assertService
            .rnAsserts(this.cadastro)
            .then(data => {
                this.listAsserts = data;
                this.holderService.listAsserts = this.listAsserts;
                this.assertService.validaAsserts(this.listAsserts)
                    .then(data => {
                        this.listResumo = data;
                        this.holderService.listResumo = this.listResumo;
                        if (this.listResumo.cadastro) {
                            this.getValidacao();
                        } else {
                            let msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente."
                            this.mloger(msgalerterror);
                            this.callAlert(msgalerterror, "alert-danger");
                        }
                    });
            });
    }

    /*
    * Loger... 
    */
    mloger(msgConclusao) {
        this.makeLogerService
            .makeLoger(msgConclusao, this.instancia, this.cadastro, this.objectValid, this.listResumo)
            .then(data => {
                this.loger = data;
                this.logerService.makeLog(this.loger);
            })
    }

    holderAtribuition() {
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
        this.listAsserts = this.holderService.listAsserts;
        this.listResumo = this.holderService.listResumo;

        this.alertMsg = {
            msg: this.holderService.alertState.msg,
            alertType: this.holderService.alertState.alertType
        }
        this.alertAtivo = this.holderService.alertState.alertAtivo;
        this.alertCloseable = this.holderService.alertState.alertCloseable;
    }
}
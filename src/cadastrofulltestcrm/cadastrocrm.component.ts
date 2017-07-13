import { LogerService } from './../util/loger/loger.service';
import { Loger } from './../viewmodel/loger/loger';
import { FulltestCrmService } from './../fulltestcrm/fulltestcrm.service';
import { element } from 'protractor';
import { Resumo } from './../viewmodel/tabelaresumo';
import { CadastroCrmService } from './cadastrocrm.service';
import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
    selector: 'cadastro-crm-component',
    templateUrl: 'cadastrocrm.component.html',
    styleUrls: ['cadastrocrm.component.css']
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
        private logerService: LogerService) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
    }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        //Inicia o fulltest assim que inicializa o componente
        this.getCadastro();
    }

    //Busca instancia retornando cadastro.
    getCadastro() {
        this.searchCadastro = true;
        this.cadastroCrmService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searchCadastro = false;
                this.rnAsserts();
                if (this.listResumo.cadastro) {
                    this.getValidacao();
                } else {
                    let msgalerterror = "Cliente com erro de cadastro, favor transferir chamada ao CO utilizando o fluxo com o problema/sintoma informado pelo cliente."
                    this.makeLoger(msgalerterror);
                    this.callAlert(msgalerterror, "alert-danger");
                }
            }, error => {
                this.searchCadastro = false;
                this.makeLoger(error.mError);
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
                this.searchFulltest = false;
                this.listResumo.fulltest = this.objectValid.resultado;
                let typeAlert;
                if (this.listResumo.fulltest) {
                    this.callAlert(this.objectValid.mensagem, "alert-success");
                } else {
                    this.callAlert(this.objectValid.mensagem, "alert-danger");
                }
                this.makeLoger(this.objectValid.mensagem);
            }, error => {
                this.callAlert(error.mError, "alert-danger");
                this.listResumo.fulltest = false;
                this.searchFulltest = false;
                this.makeLoger(error.mError);
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
    }

    /**
    * Validações dos Asserts para a lista de resumo.
    */
    rnAsserts() {
        let bloqueio = null;
        let tbsradius = null;
        let circuito = null;
        this.cadastro.asserts.forEach(element => {
            if (element.asserts == "HAS_BLOQUEIO_RADIUS") {
                bloqueio = element.value;
            }
            if (element.asserts === "DIVERGENCIA_TBS_RADIUS") {
                tbsradius = element.value;
            }
            if (element.asserts === "CIRCUITO_ATIVO") {
                circuito = element.value;
            }
        });
        this.listAsserts = {
            tbsradius: tbsradius,
            circuito: circuito,
            bloqueio: bloqueio
        }
        this.validaAsserts();
    }

    validaAsserts() {
        let cad: boolean = false;
        let bloc: boolean = false;
        if (!this.listAsserts.tbsradius && this.listAsserts.circuito) {
            cad = true;
        }
        if (this.listAsserts.bloqueio) {
            bloc = this.listAsserts.bloqueio;
        }
        this.listResumo = {
            bloqueio: bloc,
            cadastro: cad,
            fulltest: false
        }
    }

    /*
    * Loger... 
    */
    makeLoger(msgConclusao) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let inst: string = this.instancia;
        let desA: string = "-1";
        let des: string = "-1";
        let cust: string = "-1";
        let cadastro: boolean = false;
        let semBloqueio: boolean = false;
        let fulltest: boolean = false;
        let objval: string = "-1";

        if (this.cadastro) {
            inst = this.cadastro.instancia;
            desA = this.cadastro.designadorAcesso;
            des = this.cadastro.designador;
            cust = JSON.stringify(this.cadastro);
            cadastro = this.listResumo.cadastro;
            semBloqueio = !this.listResumo.bloqueio;
            fulltest = this.listResumo.fulltest;
            // Se objvalid 
            if (this.objectValid) {
                objval = JSON.stringify(this.objectValid);
            }
        }

        this.loger = {
            instancia: inst,
            designador: des,
            designadorAcesso: desA,
            executor: usr.user,
            conclusao: msgConclusao,
            cadastro: cadastro,
            semBloqueio: semBloqueio,
            fulltest: fulltest,
            customer: cust,
            valids: objval
        }
        this.logerService.makeLog(this.loger);
    }
}
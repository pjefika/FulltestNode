import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { Util } from './../../util/util';

import { FulltestService } from './fulltest.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Injector } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: "full-test-component",
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css']
})

export class FulltestComponent extends CallAlertService implements OnInit {

    private cadastro: Cadastro;
    private objectValid: ObjectValid;

    private searchFulltest: boolean = false;
    private alertTypeOn: boolean = false;
    private doFulltest: boolean = false;

    private abreModal: boolean = false;

    constructor(
        private fulltestService: FulltestService,
        public toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        super(toastyComponent);
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
    }

    public ngOnInit(): void {
        if (!this.objectValid) {
            if (this.cadastro.eventos.length > 0) {
                this.abreModal = true;
                this.msg = { msg: "Cliente com evento massivo, podem ocorrer erros em algumas correções e/ou validações.", alertType: "alert-warning" }
                this.alertAtivo = true;
            } else {
                this.realizaFulltest();
                if (this.cadastro.rede.planta == "VIVO1") {
                    this.msg = { msg: "Não há evento massivo para este cliente.", alertType: "alert-info" }
                    this.alertAtivo = true;
                }

            }
        }

        this.holderService.btnResumoInfosAtivo = true;
    }

    public realizaFulltest(): void {
        this.abreModal = false; // fecha modal de validação massivo se aberto.

        this.searchFulltest = true;
        this.fulltestService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
                this.holderService.objectValid = this.objectValid;
            }, error => {
                this.searchFulltest = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });

        //for testing purposes
        // this.objectValid = this.fulltestService.getValidacaoMock();
        // this.searchFulltest = false;

    }

}
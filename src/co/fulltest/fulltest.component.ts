import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { Util } from './../../util/util';

import { FulltestService } from './fulltest.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Injector } from '@angular/core';

@Component({
    selector: "full-test-component",
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css']
})

export class FulltestComponent implements OnInit {

    cadastro: Cadastro;
    objectValid: ObjectValid;

    searchFulltest: boolean = false;
    alertTypeOn: boolean = false;
    doFulltest: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(
        private fulltestService: FulltestService,
        private injector: Injector,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        this.cadastro = this.holderService.cadastro;
        this.objectValid = this.holderService.objectValid;
    }

    public ngOnInit(): void {
        if (!this.objectValid) {
            this.realizaFulltest();
        }
        this.holderService.resumoInfosAtivo = true;
        this.holderService.btnResumoInfosAtivo = true;
    }

    public realizaFulltest(): void {
        this.searchFulltest = true;
        // this.fulltestService
        //     .getValidacao(this.cadastro)
        //     .then(data => {
        //         this.objectValid = data;
        //         this.searchFulltest = false;
        //         this.holderService.objectValid = this.objectValid;
        //     }, error => {
        //         this.searchFulltest = false;
        //         this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
        //     });


        //for testing purposes
        this.objectValid = this.fulltestService.getValidacaoMock();
        this.searchFulltest = false;

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
}
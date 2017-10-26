import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { Util } from './../../util/util';

import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import { Wizard } from "clarity-angular";

import { CadastroService } from './cadastro.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent implements OnInit {

    cadastro: Cadastro;

    instancia: string;
    searching: boolean = false;
    modalOpen: boolean = false;

    toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    private alertDOneAtivo: boolean = false;
    private alertDOneType: string;
    private alertDOneMsg: string;

    private searchingRede: boolean = false;

    constructor(
        private cadastroService: CadastroService,
        private router: Router,
        private util: Util,
        private injector: Injector,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        this.instancia = this.holderService.instancia;
    }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
        //Se cadastro já foi consultado e preenchido o mesmo so atribui para a variavel. 
        if (this.holderService.cadastro) {
            this.cadastro = this.holderService.cadastro;
            if (this.cadastro.rede.origem === "OFFLINE") {
                this.callAlertRede(true, "alert-info", "Atenção cadastro carregado da base do dia anterior.");
            }
        } else {
            this.getCadastro();
        }
    }

    public getCadastro(): void {
        this.searching = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searching = false;
                this.holderService.cadastro = this.cadastro;
                this.holderService.liberarSubNav = true;
                if (!this.cadastro.rede.tipo) {
                    this.searchingRede = true;
                    this.cadastroService
                        .getCadastroDOne(this.instancia)
                        .then(data => {
                            this.cadastro.rede = data.rede;
                            this.callAlertRede(true, "alert-info", "Atenção cadastro carregado da base do dia anterior.");
                            this.searchingRede = false;
                        }, error => {
                            this.callAlertRede(true, "alert-danger", "Atenção não existe informações de cadastro em nossas bases.");
                            this.searchingRede = false;
                        });
                }
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
    }

    private callAlertRede(alertAtivo: boolean, alertType: string, alertMsg: string) {
        this.alertDOneAtivo = alertAtivo;
        this.alertDOneType = alertType;
        this.alertDOneMsg = alertMsg;
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
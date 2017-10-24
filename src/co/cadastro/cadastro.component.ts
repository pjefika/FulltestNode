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

    constructor(
        private cadastroService: CadastroService,
        private router: Router,
        private util: Util,
        private injector: Injector,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        // Injeta o parametro input/dados passados para a variavel
        this.instancia = this.injector.get('instancia');
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
                    this.cadastroService
                        .getCadastroDOne(this.instancia)
                        .then(data => {
                            this.cadastro.rede = data.rede;
                            this.alertDOneAtivo = true;
                            this.alertDOneType = "alert-info";
                            this.alertDOneMsg = "Atenção cadastro carregado da base do dia anterior por favor realize a validação.";
                        }, error => {
                            this.alertDOneAtivo = true;
                            this.alertDOneType = "alert-danger";
                            this.alertDOneMsg = "Atenção não existe informações de cadastro em nossas bases.";
                        });
                }
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
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
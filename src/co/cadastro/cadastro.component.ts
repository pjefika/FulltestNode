import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';
import { Util } from './../../util/util';

import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import { Wizard } from "clarity-angular";

import { CadastroService } from './cadastro.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent extends CallAlertService implements OnInit {

    private cadastro: Cadastro;

    private instancia: string;
    private searching: boolean = false;
    private modalOpen: boolean = false;

    private alertDOneAtivo: boolean = false;
    private alertDOneType: string;
    private alertDOneMsg: string;

    private searchingRede: boolean = false;

    constructor(public toastyComponent: ToastyComponent,
        private cadastroService: CadastroService,
        private router: Router,
        private util: Util,
        private injector: Injector,
        private holderService: HolderService) {
        super(toastyComponent);
        this.instancia = this.holderService.instancia;
    }

    public ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
        //Se cadastro já foi consultado e preenchido o mesmo so atribui para a variavel. 
        if (this.holderService.cadastro) {
            this.cadastro = this.holderService.cadastro;
            if (this.cadastro.rede.origem === "OFFLINE") {
                this.callAlert(true, "alert-info", "Atenção cadastro carregado da base do dia anterior.");
            }
        } else {
            this.getCadastro();
        }
        this.holderService.resumoInfosAtivo = false;
        this.holderService.btnResumoInfosAtivo = false;
    }

    public getCadastro(): void {
        this.searching = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                this.cadastro = data;
                this.searching = false;
                this.holderService.cadastro = this.cadastro;
                if (!this.cadastro.rede.tipo) {
                    this.searchingRede = true;
                    this.cadastroService
                        .getCadastroDOne(this.cadastro.instancia)
                        .then(data => {
                            this.cadastro.rede = data.rede;
                            this.callAlert(true, "alert-info", "Atenção cadastro carregado da base do dia anterior.");
                            this.searchingRede = false;
                            this.validCadastroRedeEServico();
                        }, error => {
                            this.callAlert(true, "alert-danger", "Atenção não existe informações de cadastro em nossas bases.");
                            this.searchingRede = false;
                        });
                } else {
                    this.validCadastroRedeEServico();
                }
            }, error => {
                this.searching = false;
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            })
            .then(() => {
                // if (this.cadastro.rede.planta === "VIVO1") {
                //     this.holderService.origenPlanta = true;
                // } else {
                //     this.holderService.origenPlanta = false;
                // }
            })
    }

    private validCadastroRedeEServico() {
        if (this.cadastro) {
            //Valida Rede or Valida Servico
            if (!this.cadastro.rede.tipo || !this.cadastro.servicos.velDown && !this.cadastro.servicos.velUp) {
                console.log(this.cadastro.rede.tipo);
                this.holderService.liberarSubNav = false;
            } else {
                this.holderService.liberarSubNav = true;
            }
        }
    }

}
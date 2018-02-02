import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { HolderService } from './../../util/holder/holder.service';
import { ToastyComponent } from './../../util/toasty/toasty.component';

import { Component, OnInit, Injector, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Wizard } from "clarity-angular";

import { CadastroService } from './cadastro.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { CadastroWizardComponent } from 'co/cadastro/wizard/cadastro-wizard.component';
import { AcsService } from 'util/comp_complementares/acs/acs.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css'],
    providers: [AcsService]
})

export class CadastroComponent extends CallAlertService implements OnInit, OnChanges {

    private instancia: string;
    private searching: boolean = false;
    private modalOpen: boolean = false;

    private searchingRede: boolean = false;

    constructor(public toastyComponent: ToastyComponent,
        private cadastroService: CadastroService,
        public holderService: HolderService,
        private acsService: AcsService) {
        super(toastyComponent);
        this.instancia = this.holderService.instancia;
    }

    public ngOnInit(): void {
        // for test purposes
        // this.holderService.cadastro = this.cadastroService.getMock();
        // this.holderService.liberarSubNav = true;

        //Se cadastro já foi consultado e preenchido o mesmo so atribui para a variavel. 
        if (this.holderService.cadastro) {
            if (this.holderService.cadastro.rede.origem === "OFFLINE") {
                this.callAlert(true, "alert-info", "Atenção cadastro carregado da base do dia anterior.");
            }
        } else {
            this.searching = true;
            this.getCadastro();
            // this.holderService.liberarSubNav = true;
        }
        this.holderService.resumoInfosAtivo = false;
        this.holderService.btnResumoInfosAtivo = false;
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public getCadastro(): void {
        this.holderService.searchingCadastro = true;
        this.cadastroService
            .getCadastro(this.instancia)
            .then(data => {
                // this.cadastro = data;
                this.holderService.cadastro = data;
                if (!this.holderService.cadastro.rede.tipo) {
                    this.searchingRede = true;
                    this.cadastroService
                        .getCadastroDOne(this.holderService.cadastro.instancia)
                        .then(data => {
                            this.holderService.liberarSubNav = true;
                            this.holderService.cadastro.rede = data.rede;
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
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            })
            .then(() => {
                // if (this.cadastro.rede.planta === "VIVO1") {
                //     this.holderService.origenPlanta = true;
                // } else {
                //     this.holderService.origenPlanta = false;
                // }
                this.holderService.searchingCadastro = false;
            });
    }

    private validCadastroRedeEServico() {
        if (this.holderService.cadastro) {
            //Valida Rede or Valida Servico
            if (!this.holderService.cadastro.rede.tipo || (!this.holderService.cadastro.servicos.velDown && !this.holderService.cadastro.servicos.velUp)) {
                //console.log(this.cadastro.rede.tipo);
                this.holderService.liberarSubNav = false;
            } else {
                this.holderService.liberarSubNav = true;
            }
        }
    }

    public hasStackBlockDetail(obj: any) {
        if (obj.key == "rede" ||
            obj.key == "linha" ||
            obj.key == "radius" ||
            obj.key == "servicos") {
            return true
        }
        return false
    }
    public hasStackBlockAtAll(obj: any) {
        if (obj.key == "redeExterna" ||
            obj.key == "asserts" ||
            obj.key == "eventos") {
            return false
        }
        return true
    }

}
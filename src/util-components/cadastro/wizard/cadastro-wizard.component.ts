import { Wizard, WizardPage } from 'clarity-angular';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { EnumService } from '../../../util/enum/enum.service';
import { Customer } from '../../../viewmodel/customer/customer';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'cadastro-wizard-component',
    templateUrl: 'cadastro-wizard.component.html',
    providers: [EnumService]
})

export class CadastroWizardComponent implements OnInit {

    @ViewChild("wizardmodal") public wizardmodal: Wizard;

    @ViewChild("paginarede") public paginarede: WizardPage;
    @ViewChild("paginaservico") public paginaservico: WizardPage;

    public cadastro: Customer;

    private listEnumTv: String[];
    private listEnumVoz: String[];
    private listEnumVelocidades: String[];

    private msg: {
        alertType: string,
        msg: string
    }

    private alertMsg: Boolean = false;

    constructor(
        private enumService: EnumService,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        this.cadastro = this.variavelHolderService.cadastro;
    }

    private abrirModal() {
        this.systemHolderService.modalWizardCadastroIsOpen = true;
        this.systemHolderService.modalInfoDMIsOpen = false;
    }

    public ngOnInit(): void {
        this.validaCadastroFull();
        //List Enuns
        this.getEnumVoz();
        this.getEnumVelocidades();
        this.getEnumTv();
        this.allwizardpagewassee();
    }

    private allwizardpagewassee() {
        // Deixa todas as clr-wizard-page completas para navegação.
        // this.paginacadastro.completed = true;
        this.paginarede.completed = true;
        this.paginaservico.completed = true;
    }

    private validaCadastroFull() {
        if (!this.cadastro.rede.tipo) {
            this.jumpToPaginaRede();
            this.systemHolderService.modalWizardCadastroIsOpen = true;
        } else if (!this.cadastro.servicos.velDown && !this.cadastro.servicos.velDown) {
            this.jumpToPaginaServico();
            this.systemHolderService.modalWizardCadastroIsOpen = true;
        }
    }

    private jumpToPaginaRede() {
        this.jumpTo(this.paginarede);
    }
    private jumpToPaginaServico() {
        this.jumpTo(this.paginaservico);
    }

    private jumpTo(page: WizardPage) {
        this.wizardmodal.navService.setCurrentPage(page);
    }

    private getEnumTv() {
        this.enumService
            .getEnumTv()
            .then(data => {
                this.listEnumTv = data;
            }, error => {
                //console.log("Erro ao buscar enum TV");
            });
    }

    private getEnumVoz() {
        this.enumService
            .getEnumVoz()
            .then(data => {
                this.listEnumVoz = data;
            }, error => {
                //console.log("Erro ao buscar enum Voz");
            });
    }

    private getEnumVelocidades() {
        this.enumService
            .getEnumVelocidades()
            .then(data => {
                this.listEnumVelocidades = data;
            }, error => {
                //console.log("Erro ao buscar enum Velocidades");
            });
    }

    private validCadastroRedeEServico(): Boolean {
        if (!this.cadastro.rede.vendorDslam || (!this.cadastro.servicos.velDown && !this.cadastro.servicos.velUp)) {
            // this.systemHolderService.liberarSubNav = false;
            return false;
        } else {
            // this.systemHolderService.liberarSubNav = true;
            return true;
        }
    }

    private onCommit() {
        if (this.validCadastroRedeEServico()) {
            this.wizardmodal.forceFinish();
            this.variavelHolderService.cadastro = this.cadastro;
        } else {
            this.alertMsg = true;
            this.msg = {
                alertType: "alert-danger",
                msg: "Por favor preencha todas as informaçoes."
            }
        }
    }

}
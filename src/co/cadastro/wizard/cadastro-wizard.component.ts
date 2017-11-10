import { Cadastro } from './../../../viewmodel/cadastro/cadastro';

import { Wizard, WizardPage } from 'clarity-angular';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { EnumService } from 'util/comp_complementares/enum.service';

@Component({
    selector: 'cadastro-wizard-component',
    templateUrl: 'cadastro-wizard.component.html',
    styleUrls: ['cadastro-wizard.component.css'],
    providers: [EnumService]
})

export class CadastroWizardComponent implements OnInit {

    @ViewChild("wizardmodal") public wizardmodal: Wizard;

    @ViewChild("paginacadastro") public paginacadastro: WizardPage;
    @ViewChild("paginarede") public paginarede: WizardPage;
    @ViewChild("paginaservico") public paginaservico: WizardPage;

    private modalOpen: boolean = false;

    @Input() public cadastro: Cadastro;

    private listEnumTv: String[];
    private listEnumVoz: String[];
    private listEnumVelocidades: String[];

    constructor(
        private enumService: EnumService) { }

    public ngOnInit(): void {
        this.validaCadastroFull();
        //List Enuns
        this.getEnumVoz();
        this.getEnumVelocidades();
        this.getEnumTv();
    }

    private validaCadastroFull() {
        if (!this.cadastro.rede) {
            this.jumpToPaginaCadastro();
            this.modalOpen = true;
        } else if (!this.cadastro.servicos.velDown && !this.cadastro.servicos.velDown) {
            this.jumpToPaginaServico();
            this.modalOpen = true;
        }
    }

    private jumpToPaginaCadastro() {
        this.jumpTo(this.paginacadastro);
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
                console.log("Erro ao buscar enum TV");
            });
    }

    private getEnumVoz() {
        this.enumService
            .getEnumVoz()
            .then(data => {
                this.listEnumVoz = data;
            }, error => {
                console.log("Erro ao buscar enum Voz");
            });
    }

    private getEnumVelocidades() {
        this.enumService
            .getEnumVelocidades()
            .then(data => {
                this.listEnumVelocidades = data;
            }, error => {
                console.log("Erro ao buscar enum Velocidades");
            });
    }

}
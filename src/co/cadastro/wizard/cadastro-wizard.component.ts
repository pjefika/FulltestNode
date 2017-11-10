import { Cadastro } from './../../../viewmodel/cadastro/cadastro';

import { Wizard } from 'clarity-angular';
import { Component, Input, ViewChild, OnInit } from '@angular/core';

@Component({
    selector: 'cadastro-wizard-component',
    templateUrl: 'cadastro-wizard.component.html',
    styleUrls: ['cadastro-wizard.component.css']
})

export class CadastroWizardComponent implements OnInit {

    @ViewChild("wizardmodal") public wizardmodal: Wizard;

    private modalOpen: boolean = false;

    @Input() public cadastro: Cadastro;

    public ngOnInit(): void {
        if (!this.cadastro.rede || !this.cadastro.servicos) {
            this.modalOpen = true;
        }
    }

}
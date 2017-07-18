import { Cadastro } from './../../../viewmodel/cadastro/cadastro';

import { Wizard } from 'clarity-angular';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'cadastro-wizard-component',
    templateUrl: 'cadastro-wizard.component.html',
    styleUrls: ['cadastro-wizard.component.css']
})

export class CadastroWizardComponent {

    @ViewChild("wizardmodal") wizardmodal: Wizard;

    modalOpen: boolean = false;

    @Input() cadastro: Cadastro;


}
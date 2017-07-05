import { Wizard } from 'clarity-angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'principal-wizard-component',
    templateUrl: 'principal-wizard.component.html',
    styleUrls: ['principal-wizard.component.css']
})

export class PrincipalWizardComponent implements OnInit {

    @ViewChild("wizardlg") wizard: Wizard;
    imgbusca = "./assets/imagens/bemvindo.png";
    imgcadastro = "./assets/imagens/cadastro.png";
    imgfulltest = "./assets/imagens/fulltest.png";

    constructor() { }

    ngOnInit() { }
}
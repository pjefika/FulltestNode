import { Wizard } from 'clarity-angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'principal-wizard-component',
    templateUrl: 'principal-wizard.component.html',
    styleUrls: ['principal-wizard.component.css']
})

export class PrincipalWizardComponent implements OnInit {
    
    @ViewChild("wizardlg") wizard: Wizard;
    private imgbusca = "./assets/imagens/bemvindo.png";
    private imgcadastro = "./assets/imagens/cadastro.png";
    private imgfulltest = "./assets/imagens/fulltest.png";

    private mdOpen: boolean = false;

    constructor() { }

    public ngOnInit() { }
    
}
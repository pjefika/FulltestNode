import { Component, OnInit } from '@angular/core';
import { SystemHolderService } from '../../util/holder/systemHolder.service';

@Component({
    selector: 'toggle-component',
    templateUrl: 'toggle.component.html',
    styleUrls: ['toggle.component.css']
})

export class ToggleComponent implements OnInit {

    private modalIsOpen: boolean = false;
    private qualCadastro: string = "CO";
    private nameButton: string = "Voltar";
    private disableButton: boolean = false;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        this.systemHolderService.qualCadastro = this.qualCadastro;
    }

    private hitclose() {
        this.modalIsOpen = false;
        this.systemHolderService.qualCadastro = this.qualCadastro;
    }

    private escolheEFecha(value: string) {
        this.qualCadastro = value;
        this.nameButton = "Aguarde...";
        this.disableButton = true;
        this.systemHolderService.qualCadastro = this.qualCadastro;
        setTimeout(() => {
            this.nameButton = "Voltar";
            this.disableButton = false;
            this.modalIsOpen = false;
        }, 200);
    }

}
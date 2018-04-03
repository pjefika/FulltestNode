import { Component, OnInit } from '@angular/core';
import { SystemHolderService } from '../../util/holder/systemholder.service';

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
    }

    private escolheEFecha() {
        this.nameButton = "Aguarde...";
        this.systemHolderService.qualCadastro = this.qualCadastro;
        this.nameButton = "Voltar";
        this.hitclose();
    }

}
import { HolderService } from 'util/holder/holder.service';
import { Component, OnInit } from '@angular/core';
import { AcsService } from 'util/comp_complementares/acs/acs.service';
import { Equipamento } from 'viewmodel/acs/equipamento';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'acs-component',
    templateUrl: 'acs.component.html',
    styleUrls: ['acs.component.css'],
    providers: [AcsService]
})

export class AcsComponent implements OnInit {

    private designador: string;

    private equipamentos: Equipamento[];

    private searching: boolean;

    constructor(
        private acsService: AcsService,
        private toastyComponent: ToastyComponent,
        private holderService: HolderService) {
        this.designador = this.holderService.cadastro.designador;
    }

    public ngOnInit() {
        this.getEquipamentoAssoc();
    }

    private getEquipamentoAssoc() {
        this.searching = true;
        this.acsService
            .getEquipamentoAssoc(this.designador)
            .then(data => {
                this.equipamentos = data;
                this.searching = false;
            }, error => {
                this.searching = false;
                //this.callToasty("Ops, aconteceu algo.", error.mError, "warning", 5000);
            })
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}
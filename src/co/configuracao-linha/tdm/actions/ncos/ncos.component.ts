import { Ncos } from './../../../../../viewmodel/cadastro-linha/ncos';
import { HolderService } from './../../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { NcosService } from './ncos.service';
import { Component, OnInit } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'ncos-component',
    templateUrl: 'ncos.component.html',
    styleUrls: ['ncos.component.css'],
    providers: [NcosService]
})

export class NcosComponent extends CallAlertService implements OnInit {

    private ncosList: Ncos[];
    private ncos: string = this.holderService.cadastroLinha.ncos.key;

    private nomeButton: string = "Alterar";
    private disableButton: boolean = false;

    constructor(
        private ncosService: NcosService,
        public toastyComponent: ToastyComponent,
        public holderService: HolderService) { super(toastyComponent); }

    ngOnInit() {
        //this.getNcos();
        this.ncosList = this.holderService.listaDeNcos;
    }

    public getNcos() {
        this.ncosService.getNcos()
            .then(data => {
                this.ncosList = data;
            }, error => {
                super.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
            });
    }

    public setNcos() {
        if (this.ncos) {
            this.nomeButton = "Alterando Ncos, Aguarde...";
            this.disableButton = true;
            this.ncosService.setNcos(this.holderService.cadastro.linha, this.ncos)
                .then(data => {
                    this.holderService.cadastroLinha = data;
                    this.nomeButton = "Alterar";
                    this.disableButton = false;
                    super.callToasty("Sucesso.", "Ncos Alterado com sucesso.", "success", 5000);
                }, error => {
                    super.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                    this.nomeButton = "Alterar";
                    this.disableButton = false;
                });
        } else {
            super.callToasty("Ops, aconteceu algo.", "Selecione o NCOS", "error", 5000);
        }
    }

}
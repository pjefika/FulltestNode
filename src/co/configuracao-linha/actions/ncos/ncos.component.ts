import { HolderService } from './../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../util/toasty/toasty.component';
import { Ncos } from './../../../../viewmodel/cadastro-linha/ncos';
import { NcosService } from './ncos.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ncos-component',
    templateUrl: 'ncos.component.html',
    styleUrls: ['ncos.component.css'],
    providers: [NcosService]
})

export class NcosComponent implements OnInit {

    private ncosList: Ncos[];
    private ncos: string = this.holderService.cadastroLinha.ncos.key;

    private nomeButton: string = "Alterar";
    private disableButton: boolean = false;

    constructor(
        private ncosService: NcosService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) { }

    ngOnInit() {
        //this.getNcos();
        this.ncosList = this.holderService.listaDeNcos;
    }

    public getNcos() {
        this.ncosService.getNcos()
            .then(data => {
                this.ncosList = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
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
                    this.callToasty("Sucesso.", "Ncos Alterado com sucesso.", "success", 5000);
                }, error => {
                    this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                    this.nomeButton = "Alterar";
                    this.disableButton = false;
                });
        } else {
            this.callToasty("Ops, aconteceu algo.", "Selecione o NCOS", "error", 5000);
        }
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
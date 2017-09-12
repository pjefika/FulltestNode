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
    //private incos: Ncos = this.holderService.cadastroLinha.ncos;
    private ncos: string = this.holderService.cadastroLinha.ncos.desc;

    private ncosO: Ncos;

    constructor(
        private ncosService: NcosService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) { }

    ngOnInit() {
        this.getNcos();
    }

    public getNcos() {
        this.ncosService.getNcos()
            .then(data => {
                this.ncosList = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public setNcos() {
        this.ncosList.forEach(element => {
            if (element.desc === this.ncos) {
                this.ncosO = element;
            }
        });

        console.log(this.ncosO);
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.addToasty();
    }
}
import { ToastyComponent } from './../../../../util/toasty/toasty.component';
import { ListarLensLivresService } from './../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../general-services/listar-linha.service';
import { LensLivres } from './../../../../viewmodel/cadastro-linha/lens-livres/lens-livres';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { ManobraLinhaService } from './manobrar-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'manobrar-linha-component',
    templateUrl: 'manobrar-linha.component.html',
    styleUrls: ['manobrar-linha.component.css'],
    providers: [ManobraLinhaService, ListarLinhaService, ListarLensLivresService]
})

export class ManobrarLinhaComponent implements OnInit {

    private instanciaBinada: string;
    private cadInstanciaBinada: Linha;

    //Infos do botão
    private consultarLenLoadingButton: boolean = false;
    private consultarLenDisabledButton: boolean = false;
    private consultarLenNameButton: string = "Consultar Len's";

    private listLens: LensLivres[];
    private qualLen: string;

    constructor(
        private listarLinhaService: ListarLinhaService,
        private listarLensLivresService: ListarLensLivresService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    public getLinhaBinada() {
        this.consultarLenLoadingButton = true;
        this.consultarLenDisabledButton = true;
        this.consultarLenNameButton = "Consultando Len's Aguarde..."
        this.listarLinhaService.getLinha(this.instanciaBinada)
            .then(data => {
                this.cadInstanciaBinada = data;
                this.getLensLivres();
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenNameButton = "Consultar Len's"
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            });
    }

    public getLensLivres() {
        this.listLens = null;
        this.listarLensLivresService.getLensLivres(this.cadInstanciaBinada)
            .then(data => {
                this.listLens = data;
                this.consultarLenNameButton = "Consultar Len's"
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenNameButton = "Consultar Len's"
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            });
    }

    public manobrarLinha() {
        console.log(this.qualLen);
    }

    public callToasty(titulo, msg, theme) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        };
        this.toastyComponent.addToasty();
    }
}
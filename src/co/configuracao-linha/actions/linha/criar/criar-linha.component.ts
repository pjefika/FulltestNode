import { LensLivres } from './../../../../../viewmodel/cadastro-linha/lens-livres/lens-livres';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { ListarLensLivresService } from './../../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../../general-services/listar-linha.service';
import { CriarLinhaService } from './criar-linha.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'criar-linha-component',
    templateUrl: 'criar-linha.component.html',
    styleUrls: ['criar-linha.component.css'],
    providers: [CriarLinhaService, ListarLinhaService, ListarLensLivresService]
})

export class CriarLinhaComponent implements OnInit {

    @Input() ativo: boolean = false;

    private instanciaBinada: string;
    private cadInstanciaBinada: Linha;

    //Infos do botão
    private consultarLenLoadingButton: boolean = false;
    private consultarLenDisabledButton: boolean = false;
    private consultarLenNameButton: string = "Consultar Len's";

    private listLens: LensLivres[];
    private qualLen: string;

    constructor(
        private criarLinhaService: CriarLinhaService,
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
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            });
    }

    public getLensLivres() {
        this.listarLensLivresService.getLensLivres(this.cadInstanciaBinada)
            .then(data => {
                this.listLens = data;
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
            });
    }

    public createLinha() {
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
import { HolderService } from './../../../../../util/holder/holder.service';
import { ConfiguracaoLinhaService } from './../../../configuracao-linha.service';
import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { ConfiguracoesLensLivres } from './../../../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { LensLivres } from './../../../../../viewmodel/cadastro-linha/lens-livres/lens-livres';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { ListarLensLivresService } from './../../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../../general-services/listar-linha.service';
import { CriarLinhaService } from './criar-linha.service';
import { Component, OnInit, Input } from '@angular/core';
import { Len } from './../../../../../viewmodel/cadastro-linha/len';


@Component({
    selector: 'criar-linha-component',
    templateUrl: 'criar-linha.component.html',
    styleUrls: ['criar-linha.component.css'],
    providers: [CriarLinhaService, ListarLinhaService, ListarLensLivresService, ConfiguracaoLinhaService]
})

export class CriarLinhaComponent implements OnInit {

    @Input() ativo: boolean = false;

    private instanciaBinada: string;
    private cadInstanciaBinada: Linha;

    //Infos do botão consultar len
    private consultarLenLoadingButton: boolean = false;
    private consultarLenDisabledButton: boolean = false;
    private consultarLenNameButton: string = "Consultar Len's";

    private listLens: ConfiguracoesLensLivres;
    private confBinada: CadastroLinha;
    private qualLen: Len;

    //infos botão criar linha
    private criarLinhaNomeButton: string = "Criar Linha";
    private criarLinhaDisableButton: boolean = false;

    constructor(
        private criarLinhaService: CriarLinhaService,
        private listarLinhaService: ListarLinhaService,
        private listarLensLivresService: ListarLensLivresService,
        private toastyComponent: ToastyComponent,
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        public holderService: HolderService) { }

    ngOnInit() { }

    public getLinhaBinada() {
        this.consultarLenLoadingButton = true;
        this.consultarLenDisabledButton = true;
        this.consultarLenNameButton = "Consultando Len's Aguarde..."
        this.listLens = null;
        this.listarLinhaService.getLinha(this.instanciaBinada)
            .then(data => {
                this.cadInstanciaBinada = data;
                this.getConfLinhaBinada();
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            });
    }

    public getConfLinhaBinada() {
        this.configuracaoLinhaService.getInformacoes(this.cadInstanciaBinada)
            .then(data => {
                this.confBinada = data;
                this.getLensLivres();
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            })
    }

    public getLensLivres() {
        this.listarLensLivresService.getLensLivres(this.cadInstanciaBinada)
            .then(data => {
                this.listLens = data;
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            });
    }

    public createLinha() {
        this.criarLinhaNomeButton = "Criando Linha, Aguarde...";
        this.criarLinhaDisableButton = true;
        this.criarLinhaService.setCriarLinha(this.holderService.cadastro.linha, this.qualLen, this.confBinada)
            .then(data => {
                this.holderService.cadastroLinha = data;
                this.criarLinhaNomeButton = "Criar Linha";
                this.criarLinhaDisableButton = false;
                this.callToasty("Sucesso", "Linha criada com sucesso.", "success")
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error");
                this.criarLinhaNomeButton = "Criar Linha";
                this.criarLinhaDisableButton = false;
            });
    }

    public callToasty(titulo, msg, theme) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        };
        this.toastyComponent.addToasty();
    }

    private resetAllFields() {
        this.instanciaBinada = null;
        this.cadInstanciaBinada = null;
        this.listLens = null;
        this.confBinada = null;
        this.qualLen = null;
    }


}
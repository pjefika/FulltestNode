import { ConfiguracaoLinhaTdmService } from './../../../configuracao-linha-tdm.service';
import { DynamicRouterHolderService } from './../../../../../../util/dynamic-router/dynamic-router-holder.service';
import { ConfiguracaoLinhaComponent } from './../../../../configuracao-linha.component';
import { HolderService } from './../../../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../../../util/toasty/toasty.component';
import { CadastroLinha } from './../../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { ConfiguracoesLensLivres } from './../../../../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { Linha } from './../../../../../../viewmodel/cadastro/linha';
import { Len } from './../../../../../../viewmodel/cadastro-linha/len';

import { ListarLensLivresService } from './../../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../../general-services/listar-linha.service';
import { CriarLinhaService } from './criar-linha.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
    selector: 'criar-linha-component',
    templateUrl: 'criar-linha.component.html',
    styleUrls: ['criar-linha.component.css'],
    providers: [CriarLinhaService, ListarLinhaService, ListarLensLivresService, ConfiguracaoLinhaTdmService]
})

export class CriarLinhaComponent implements OnInit, OnChanges {

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

    public alertMsg: {
        msg: string;
        alertType: string;
    }
    public alertAtivo: boolean = false;
    public alertCloseable: boolean = true;

    constructor(
        private criarLinhaService: CriarLinhaService,
        private listarLinhaService: ListarLinhaService,
        private listarLensLivresService: ListarLensLivresService,
        private toastyComponent: ToastyComponent,
        private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService,
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    public ngOnInit() {
        // if (this.holderService.cadastroLinha.status === "CREATED") {
        //     this.callAlert("Linha já está criada.", "alert-warning");
        //     this.consultarLenDisabledButton = true;
        // }
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.ativo.currentValue != changes.ativo.previousValue && changes.ativo.currentValue) {
            this.seeIfChange();
        }
    }

    private seeIfChange() {
        if (this.holderService.cadastroLinha.status === "CREATED") {
            this.callAlert("Linha já está criada.", "alert-warning");
            this.consultarLenDisabledButton = true;
        }
    }

    public getLinhaBinada() {
        this.consultarLenLoadingButton = true;
        this.consultarLenDisabledButton = true;
        this.consultarLenNameButton = "Consultando Len's Aguarde..."
        this.listLens = null;
        this.listarLinhaService.getLinha(this.instanciaBinada)
            .then(data => {
                this.cadInstanciaBinada = data;
                this.getConfBinada();
                this.getLensLivres();
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            });
    }

    public getConfBinada() {
        this.configuracaoLinhaTdmService.getInformacoes(this.cadInstanciaBinada)
            .then(data => {
                this.confBinada = data;
            }, error => {
                let msgerror = error.mError + " / " + "Houve algum problema ao buscar informações da instância binada";
                this.callToasty("Ops, ocorreu um erro.", msgerror, "error", 5000);
            });
    }

    public getLensLivres() {
        this.listarLensLivresService.getLensLivres(this.cadInstanciaBinada)
            .then(data => {
                this.listLens = data;
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
            });
    }

    public createLinha() {
        if (this.qualLen) {
            this.criarLinhaNomeButton = "Criando Linha, Aguarde...";
            this.criarLinhaDisableButton = true;
            this.criarLinhaService.setCriarLinha(this.holderService.cadastro.linha, this.qualLen, this.listLens.configBinada)
                .then(data => {
                    this.holderService.cadastroLinha = data;
                    this.criarLinhaNomeButton = "Criar Linha";
                    this.criarLinhaDisableButton = false;
                    this.callToasty("Sucesso", "Linha criada com sucesso.", "success", 5000);
                    this.dynamicRouterHolderService.component = ConfiguracaoLinhaComponent;
                }, error => {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                    this.criarLinhaNomeButton = "Criar Linha";
                    this.criarLinhaDisableButton = false;
                });
        } else {
            this.callToasty("Ops, aconteceu algo.", "Selecione o Len livre", "error", 5000);
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

    public callAlert(msg, type) {
        this.alertMsg = {
            msg: msg,
            alertType: type
        }
        this.alertAtivo = true;
        this.alertCloseable = false;
    }

    private resetAllFields() {
        this.instanciaBinada = null;
        this.cadInstanciaBinada = null;
        this.listLens = null;
        this.confBinada = null;
        this.qualLen = null;
    }


}
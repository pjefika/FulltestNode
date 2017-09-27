import { HolderCompsService } from './../../../../util/component-holder/services/holder-comps.service';
import { ConfiguracaoLinhaComponent } from './../../configuracao-linha.component';
import { HolderService } from './../../../../util/holder/holder.service';
import { ConfiguracaoLinhaService } from './../../configuracao-linha.service';
import { CadastroLinha } from './../../../../viewmodel/cadastro-linha/cadastro-linha';
import { ConfiguracoesLensLivres } from './../../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { ToastyComponent } from './../../../../util/toasty/toasty.component';
import { ListarLensLivresService } from './../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../general-services/listar-linha.service';
import { LensLivres } from './../../../../viewmodel/cadastro-linha/lens-livres/lens-livres';
import { Linha } from './../../../../viewmodel/cadastro/linha';
import { ManobraLinhaService } from './manobrar-linha.service';
import { Component, OnInit } from '@angular/core';
import { Len } from './../../../../viewmodel/cadastro-linha/len';

@Component({
    selector: 'manobrar-linha-component',
    templateUrl: 'manobrar-linha.component.html',
    styleUrls: ['manobrar-linha.component.css'],
    providers: [ManobraLinhaService, ListarLinhaService, ListarLensLivresService]
})

export class ManobrarLinhaComponent implements OnInit {

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
    private manobrarLinhaNomeButton: string = "Manobrar Linha";
    private manobrarLinhaDisableButton: boolean = false;

    public alertMsg: {
        msg: string;
        alertType: string;
    }
    public alertAtivo: boolean = false;
    public alertCloseable: boolean = true;

    private showManobrar: boolean = true;

    constructor(
        private manobraLinhaService: ManobraLinhaService,
        private listarLinhaService: ListarLinhaService,
        private listarLensLivresService: ListarLensLivresService,
        private toastyComponent: ToastyComponent,
        private configuracaoLinhaService: ConfiguracaoLinhaService,
        public holderService: HolderService,
        private holderCompsService: HolderCompsService) { }

    ngOnInit() {
        if (this.holderService.cadastroLinha.status === "NOT_CREATED") {
            this.callAlert("A linha não está criada, realize a criação da mesma no Menu Linha > Criar Linha.", "alert-warning");
            this.showManobrar = false;
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
                this.getLensLivres();
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                this.consultarLenLoadingButton = false;
                this.consultarLenDisabledButton = false;
                this.consultarLenNameButton = "Consultar Len's"
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

    public manobrarLinha() {
        if (this.qualLen) {
            this.manobrarLinhaNomeButton = "Manobrando Linha, Aguarde...";
            this.manobrarLinhaDisableButton = true;
            this.manobraLinhaService.setManobrarLinha(this.holderService.cadastro.linha, this.qualLen, this.listLens.configBinada)
                .then(data => {
                    this.holderService.cadastroLinha = data;
                    this.manobrarLinhaNomeButton = "Manobrar Linha";
                    this.manobrarLinhaDisableButton = false;
                    this.callToasty("Sucesso", "Linha manobrada com sucesso.", "success", 5000);
                    this.holderCompsService.component = ConfiguracaoLinhaComponent;
                }, error => {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                    this.manobrarLinhaNomeButton = "Manobrar Linha";
                    this.manobrarLinhaDisableButton = false;
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
}
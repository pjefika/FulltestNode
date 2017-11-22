import { ConfiguracaoLinhaTdmService } from './../../configuracao-linha-tdm.service';
import { DynamicRouterHolderService } from './../../../../../util/dynamic-router/dynamic-router-holder.service';
import { ConfiguracaoLinhaComponent } from './../../../configuracao-linha.component';
import { HolderService } from './../../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { ConfiguracoesLensLivres } from './../../../../../viewmodel/cadastro-linha/lens-livres/configuracoes-lens-livres';
import { Linha } from './../../../../../viewmodel/cadastro/linha';
import { ListarLensLivresService } from './../../general-services/listar-lens-livres.service';
import { ListarLinhaService } from './../../general-services/listar-linha.service';
import { ManobraLinhaService } from './manobrar-linha.service';
import { Component, OnInit } from '@angular/core';
import { Len } from './../../../../../viewmodel/cadastro-linha/len';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'manobrar-linha-component',
    templateUrl: 'manobrar-linha.component.html',
    styleUrls: ['manobrar-linha.component.css'],
    providers: [ManobraLinhaService, ListarLinhaService, ListarLensLivresService, ConfiguracaoLinhaTdmService]
})

export class ManobrarLinhaComponent extends CallAlertService implements OnInit {

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
        public toastyComponent: ToastyComponent,
        private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService,
        public holderService: HolderService,
        public dynamicRouterHolderService: DynamicRouterHolderService) { super(toastyComponent); }

    public ngOnInit() {
        if (this.holderService.cadastroLinha.status === "NOT_CREATED") {
            super.callAlert(true, "alert-warning", "A linha não está criada, realize a criação da mesma no Menu Linha > Criar Linha.");
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
                this.getConfBinada();
                this.getLensLivres();
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
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
                super.callToasty("Ops, ocorreu um erro.", msgerror, "error", 5000);
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
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
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
                    super.callToasty("Sucesso", "Linha manobrada com sucesso.", "success", 5000);
                    this.dynamicRouterHolderService.component = ConfiguracaoLinhaComponent;

                }, error => {
                    super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                    this.manobrarLinhaNomeButton = "Manobrar Linha";
                    this.manobrarLinhaDisableButton = false;
                });
        } else {
            super.callToasty("Ops, aconteceu algo.", "Selecione o Len livre", "error", 5000);
        }
    }
}
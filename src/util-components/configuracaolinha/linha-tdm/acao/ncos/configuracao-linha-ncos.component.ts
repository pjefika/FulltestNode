import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../../toasty/toasty.component';
import { ConfiguracaoLinhaNcosService } from './configuracao-linha-ncos.service';
import { VariavelHolderService } from '../../../../../util/holder/variavelholder.service';
import { Ncos } from '../../../../../viewmodel/linha/ncos';
import { SystemHolderService } from '../../../../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-linha-ncos-component',
    templateUrl: 'configuracao-linha-ncos.component.html',
    providers: [ConfiguracaoLinhaNcosService]
})

export class ConfiguracaoLinhaNcosComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private ncosList: Ncos[];
    private ncos: string = this.variavelHolderService.cadastroLinha.ncos.key;

    private btnSetNcosDisabled: boolean = false;
    private btnSetNcosName: string = "Alterar";

    private selectDisabled: boolean = false;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        private configuracaoLinhaNcosService: ConfiguracaoLinhaNcosService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.getNcos();
    }

    private getNcos() {
        this.isLoading = true;
        this.selectDisabled = true;
        this.configuracaoLinhaNcosService
            .getNcos()
            .then(resposta => {
                this.ncosList = resposta;
            }, erro => {
                super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
                this.selectDisabled = false;
            });
    }

    private setNcos() {
        this.btnSetNcosDisabled = true;
        this.btnSetNcosName = "Aguarde...";
        this.configuracaoLinhaNcosService
            .setNcos(this.variavelHolderService.cadastro.linha, this.ncos)
            .then(resposta => {
                this.variavelHolderService.cadastroLinha = resposta;
                super.callToasty("Sucesso", "NCOS alterado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnSetNcosDisabled = false;
                this.btnSetNcosName = "Alterar";
            });
    }

}
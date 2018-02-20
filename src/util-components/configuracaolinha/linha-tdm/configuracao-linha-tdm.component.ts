import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaTdmService } from './configuracao-linha-tdm.service';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'configuracao-linha-tdm-component',
    templateUrl: 'configuracao-linha-tdm.component.html',
    providers: [ConfiguracaoLinhaTdmService]
})

export class ConfiguracaoLinhaTdmComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    constructor(private configuracaoLinhaTdmService: ConfiguracaoLinhaTdmService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {

    }

    private getInformacoes() {
        this.isLoading = true;
        this.configuracaoLinhaTdmService
            .getInformacoes(this.variavelHolderService.cadastro.linha)
            .then(resposta => {
                this.variavelHolderService.cadastroLinha = resposta;

            }, erro => {
                if (erro.mError === "Linha não pertence a Central." && this.variavelHolderService.cadastro.instancia === this.variavelHolderService.cadastroLinha.dn) {
                    super.callToasty("Ops, aconteceu algo.", "Necessário associação de número de equipamento.", "error", 5000);
                } else {
                    super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
                }
            })
            .then(() => {
                this.isLoading = false;
            });
    }

}
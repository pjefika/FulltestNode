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
                
            }, erro => {

            })
            .then(() => {
                this.isLoading = false;
            });
    }

}
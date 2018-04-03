import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-linha-component',
    templateUrl: 'configuracao-linha.component.html',
    providers: [ConfiguracaoLinhaService]
})

export class ConfiguracaoLinhaComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    constructor(private configuracaoLinhaService: ConfiguracaoLinhaService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        super.enablebtnresumoinfo();
    }
}
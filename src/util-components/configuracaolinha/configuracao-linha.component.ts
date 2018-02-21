import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaService } from './configuracao-linha.service';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';

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
        if (!this.validaTipo()) {
            this.naoimplementado();
        } else {
            super.enablebtnresumoinfo();
        }
    }

    public validaTipo(): boolean {
        let valid: boolean = false;
        if (this.variavelHolderService.cadastro.linha.tipo) {
            valid = true;
        } else {
            valid = false;
        }
        return valid;
    }

    private naoimplementado() {
        super.callAlert("alert-warning", "Funcionalidade indisponivel para este tipo de Central.");
    }

}
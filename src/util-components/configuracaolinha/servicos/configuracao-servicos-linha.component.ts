import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';
import { ConfiguracaoManobraLinhaService } from '../manobralinha/configuracao-manobra-linha.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { DynamicRouterService } from '../../dynamicrouter/dynamic-router.service';
import { ConfiguracaoLinhaComponent } from '../configuracao-linha.component';

@Component({
    selector: 'configuracao-servicos-linha-component',
    templateUrl: 'configuracao-servicos-linha.component.html',
    providers: [ConfiguracaoManobraLinhaService]
})

export class ConfiguracaoServicosLinhaComponent extends SuperComponentService implements OnInit {

    constructor(private configuracaoManobraLinhaService: ConfiguracaoManobraLinhaService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.validaLinha();
    }

    private validaLinha() {
        if (super.validaSeLinhaEstaCriada(this.variavelHolderService.cadastroLinha)) {
            super.callToasty("Ops, ocorreu um erro.", "Linha ãão está criada, por favor realize a criação da linha.", "error", 5000);
            this.dynamicRouterService.component = ConfiguracaoLinhaComponent;
        }
    }

    private veSeEstaCheck(servico: string): boolean {
        let valid = false;
        this.variavelHolderService.cadastroLinha.servicos.forEach(element => {
            if (servico === element.nome) {
                valid = true;
            }
        });
        return valid;
    }

}
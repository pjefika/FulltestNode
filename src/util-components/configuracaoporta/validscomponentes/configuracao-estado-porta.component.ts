import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { ConfiguracaoEstadoPortaService } from './configuracao-estado-porta.service';
import { Valid } from '../../../viewmodel/valid/valid';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-estado-porta-component',
    templateUrl: 'configuracao-estado-porta.component.html',
    providers: [ConfiguracaoEstadoPortaService]
})

export class ConfiguracaoEstadoPortaComponent extends SuperComponentService implements OnInit {

    @Input() public estadoPorta: Valid;

    private btnSetStateName: string = "Executar";
    private btnSetStateDisabled: boolean = false;

    constructor(public configuracaoEstadoPortaService: ConfiguracaoEstadoPortaService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    private setAdminState() {
        this.btnSetStateName = "Aguarde...";
        this.btnSetStateDisabled = true;
        this.configuracaoEstadoPortaService
            .setAdminState(this.variavelHolderService.cadastro, this.estadoPorta.result)
            .then(resultado => {
                this.estadoPorta = resultado;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnSetStateName = "Executar";
                this.btnSetStateDisabled = false;
            });
    }

}
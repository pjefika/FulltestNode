import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaCreateDeleteService } from '../configuracao-linha-create-delete.service';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { LinhaCreateComponent } from '../create/linha-create.component';
import { DynamicRouterService } from '../../../dynamicrouter/dynamic-router.service';

@Component({
    selector: 'linha-delete-component',
    templateUrl: 'linha-delete.component.html',
    providers: [ConfiguracaoLinhaCreateDeleteService]
})

export class LinhaDeleteComponent extends SuperComponentService implements OnInit {

    private abrirModal: boolean = false;

    private btnDeleteName: string = "Sim";
    private btnDeleteDisabled: boolean = false;

    constructor(private configuracaoLinhaCreateDeleteService: ConfiguracaoLinhaCreateDeleteService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    public deletarLinha() {
        this.btnDeleteName = "Aguarde";
        this.btnDeleteDisabled = true;
        this.configuracaoLinhaCreateDeleteService
            .setDeletarLinha(this.variavelHolderService.cadastro.linha, this.variavelHolderService.cadastroLinha)
            .then(resposta => {
                this.variavelHolderService.cadastroLinha = resposta;
                if (resposta.status === "NOT_CREATED") {
                    super.callToasty("Linha Deletada com sucesso.", "Por favor realize a configuração da linha!", "success", 5000);
                    this.abrirModal = false;
                    this.dynamicRouterService.component = LinhaCreateComponent;
                }
            }, erro => {
                super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnDeleteName = "Sim";
                this.btnDeleteDisabled = false;
            });
    }

}
import { Component, OnInit } from '@angular/core';
import { ConfiguracaoLinhaCustgroupService } from './configuracao-linha-custgroup.service';
import { SuperComponentService } from '../../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../../../../util/holder/variavelholder.service';

@Component({
    selector: 'configuracao-linha-custgroup-component',
    templateUrl: 'configuracao-linha-custgroup.component.html',
    providers: [ConfiguracaoLinhaCustgroupService]
})

export class ConfiguracaoLinhaCustgroupComponent extends SuperComponentService implements OnInit {

    private custgroup: string;

    private btnSetCustDisabled: boolean = false;
    private btnSetCustName: string = "Alterar";

    constructor(private configuracaoLinhaCustgroupService: ConfiguracaoLinhaCustgroupService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.custgroup = this.variavelHolderService.cadastroLinha.custGrp;
    }

    public setCustgroup() {
        if (this.custgroup) {
            this.btnSetCustDisabled = true;
            this.btnSetCustName = "Aguarde...";
            this.configuracaoLinhaCustgroupService
                .setCustGroup(this.variavelHolderService.cadastro.linha, this.custgroup)
                .then(respota => {
                    this.variavelHolderService.cadastroLinha = respota;
                    super.callToasty("Sucesso.", "Custgroup Alterado com sucesso.", "success", 5000);
                }, erro => {
                    super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
                })
                .then(() => {
                    this.btnSetCustDisabled = false;
                    this.btnSetCustName = "Alterar";
                });
        } else {
            super.callToasty("Ops, aconteceu algo.", "Preencha o campo Custgroup", "error", 5000);
        }
    }

}
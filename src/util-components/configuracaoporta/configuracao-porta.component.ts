import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { ConfiguracaoPortaService } from './configuracao-porta.service';
import { ConfPorta } from '../../viewmodel/confporta/confporta';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-porta-component',
    templateUrl: 'configuracao-porta.component.html',
    styleUrls: ['configuracao-porta.component.css'],
    providers: [ConfiguracaoPortaService]
})

export class ConfiguracaoPortaComponent extends SuperComponentService implements OnInit {

    private confPorta: ConfPorta;

    private isLoading: boolean = false;

    constructor(private configuracaoPortaService: ConfiguracaoPortaService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    };

    public ngOnInit() {
        this.doGetConfigPorta();
        super.enablebtnresumoinfo();
    }

    private doGetConfigPorta(reload?: boolean) {
        if (!this.variavelHolderService.confPorta || reload) {
            if (this.systemHolderService.ableMock) {
                this.getConfigPortaMock();
            } else {
                this.getConfigPorta();
            }
        } else {
            this.confPorta = this.variavelHolderService.confPorta;
        }
    }

    private getConfigPorta() {
        this.isLoading = true;
        this.configuracaoPortaService
            .getConfigPorta(this.variavelHolderService.cadastro)
            .then(resposta => {
                this.confPorta = resposta;
                this.variavelHolderService.confPorta = this.confPorta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    private getConfigPortaMock() {
        this.isLoading = true;
        setTimeout(() => {
            this.confPorta = this.configuracaoPortaService.getConfigPortaMock();
            this.variavelHolderService.confPorta = this.confPorta;
            this.isLoading = false;
        }, 1000);
    }

}
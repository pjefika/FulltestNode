import { Component, OnInit } from '@angular/core';
import { FulltestService } from './fulltest.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css'],
    providers: [FulltestService]
})

export class FulltestComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private btnFulltestDisable: boolean = false;

    private modalEventosMassivos: boolean = false;

    constructor(private fulltestService: FulltestService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.variavelHolderService.certification) {
            this.doCertification();
        }
        super.enablebtnresumoinfo();
    }

    private doCertification() {
        // Valida qual view para saber qual certification ira fazer.
        switch (this.systemHolderService.qualView) {
            case "CO":
                if (this.systemHolderService.ableMock) {
                    this.getCertificationCOMock();
                } else {
                    this.getCertificationCO();
                }
                break;
            case "CRM":
                if (this.systemHolderService.ableMock) {
                    // this.getCertificationCRMMock();
                    this.getCertificationCOMock();
                } else {
                    // this.getCertificationCRM();
                    this.getCertificationCO();
                }
                break;
        }
    }

    private getCertificationCO() {
        this.isLoading = true;
        this.systemHolderService.isFulltestRunning = true;
        /*
        * Envia com customer.... 
        */
        this.fulltestService
            .getCertificationCO(this.variavelHolderService.cadastro)
            .then(resposta => {
                if (super.ifIsFulltest(resposta)) {
                    this.variavelHolderService.certification = resposta;
                    if (this.variavelHolderService.certification.fulltest) {
                        this.systemHolderService.resultadoGlobalFulltest = this.variavelHolderService.certification.fulltest.resultado;
                    }
                } else {
                    super.callToasty("Ops, Aconteceu algo.", resposta.orientacao, "error", 5000);
                }
            }, erro => {
                super.callToasty("Ops, Aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
                this.systemHolderService.isFulltestRunning = false;
            });
    }

    private getCertificationCOMock() {
        this.isLoading = true;
        this.systemHolderService.isFulltestRunning = true;
        setTimeout(() => {
            this.variavelHolderService.certification = this.fulltestService.getCertificationCOMock();
            this.isLoading = false;
            this.systemHolderService.isFulltestRunning = false;
        }, 1000);
    }

    private getCertificationCRM() {
        // Não implementado.
    }

    private getCertificationCRMMock() {
        // Não implementado.
    }

}
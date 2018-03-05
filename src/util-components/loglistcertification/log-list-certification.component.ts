import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { LogListCertificationService } from './log-list-certification.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { Certification } from '../../viewmodel/fulltest/certification';

@Component({
    selector: 'log-list-certification-component',
    templateUrl: 'log-list-certification.component.html',
    providers: [LogListCertificationService]
})

export class LogListCertificationComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    constructor(private logListCertificationService: LogListCertificationService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.variavelHolderService.listCertifications) {
            this.doGetCertification();
        }
    }
    
    private doGetCertification() {
        if (this.systemHolderService.ableMock) {
            this.getCertificationByCustomerMock();
        } else {
            // this.getCertificationByCustomerMock();
            this.getCertificationByCustomer();
        }
    }

    private getCertificationByCustomer() {
        this.isLoading = true;
        this.logListCertificationService
            .getCertificationByCustomer(this.variavelHolderService.instancia)
            .then(resposta => {
                if (resposta.length > 0) {
                    this.variavelHolderService.listCertifications = resposta;
                } else {
                    super.callAlert("alert-warning", "Não encontrados nenhum log de Fulltest.");
                }
            }, erro => {
                super.callToasty("Ops, Aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    private getCertificationByCustomerMock() {
        this.isLoading = true;
        setTimeout(() => {
            let certifications: Certification[];
            certifications = this.logListCertificationService.getCertificationByCustomerMock();
            if (certifications.length > 0) {
                this.variavelHolderService.listCertifications = certifications;
            } else {
                super.callAlert("alert-warning", "Não encontrados nenhum log de Fulltest.");
            }
            this.isLoading = false;
        }, 1000);
    }

    private mountAlert() {
        super.callAlert("alert-warning", "Não encontrados nenhum log de Fulltest.");
        // if (this.variavelHolderService.listCertifications.length > 0) { }
    }


}
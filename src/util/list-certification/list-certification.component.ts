import { Component, OnInit } from '@angular/core';
import { ListCertificationService } from 'util/list-certification/list-certification.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'list-certification-component',
    templateUrl: 'list-certification.component.html',
    providers: [ListCertificationService]
})

export class ListCertificationComponentComponent extends CallAlertService implements OnInit {

    private isLoading: boolean = false;

    constructor(public toastyComponent: ToastyComponent,
        public holderService: HolderService,
        private listCertificationService: ListCertificationService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        // --Prod
        this.getCertificationByCustomer();
        // --QA
        // this.getCertificationByCustomerMock();
    }

    public getCertificationByCustomer() {
        this.isLoading = true;
        this.listCertificationService
            .getCertificationByCustomer(this.holderService.cadastro.instancia)
            .then(response => {
                if (response) {
                    this.holderService.certifications = response;
                } else {
                    super.callToasty("Ops, Aconteceu algo.", "Lista de Fulltest vazia.", "warning", 5000);
                }
            }, error => {
                // super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 5000);
                super.callToasty("Ops, Aconteceu algo.", "Lista de certificações nao implatadas", "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    public getCertificationByCustomerMock() {
        this.isLoading = true;
        setTimeout(() => {
            this.holderService.certifications = this.listCertificationService.getCertificationByCustomerMock();
            this.isLoading = false;
        }, 1000);
    }

}
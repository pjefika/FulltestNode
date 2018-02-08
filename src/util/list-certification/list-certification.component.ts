import { Component, OnInit } from '@angular/core';
import { ListCertificationService } from 'util/list-certification/list-certification.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { Certification } from 'viewmodel/certification/certification';

@Component({
    selector: 'list-certification-component',
    templateUrl: 'list-certification.component.html',
    styleUrls: ['list-certification.component.css'],
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
        if (!this.holderService.certifications) {
            this.getCertification();
        }
    }

    public getCertification() {
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
                if (response.length > 0) {
                    this.holderService.certifications = response;
                } else {
                    super.callAlert(true, "warning", "Nenhum Fulltest foi realizado até o momento.");
                }
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 5000);
                // super.callToasty("Ops, Aconteceu algo.", "Lista de certificações nao implatadas", "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    public getCertificationByCustomerMock() {
        this.isLoading = true;
        setTimeout(() => {
            let certification: Certification[];
            certification = this.listCertificationService.getCertificationByCustomerMock();
            // certification = [];
            if (certification.length > 0) {
                this.holderService.certifications = certification;
            } else {
                super.callAlert(true, "warning", "Nenhum Fulltest foi realizado até o momento.");
            }
            this.isLoading = false;
        }, 1000);
    }

}
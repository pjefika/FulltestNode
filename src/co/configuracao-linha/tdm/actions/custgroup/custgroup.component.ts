import { HolderService } from './../../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { CustgroupService } from './custgroup.service';
import { Component, OnInit } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'custgroup-component',
    templateUrl: 'custgroup.component.html',
    styleUrls: ['custgroup.component.css'],
    providers: [CustgroupService]
})

export class CustgroupComponent extends CallAlertService implements OnInit {

    private custgroup: string;

    private nomeButton: string = "Alterar";
    private disableButton: boolean = false;

    constructor(
        private custgroupService: CustgroupService,
        public toastyComponent: ToastyComponent,
        public holderService: HolderService) { super(toastyComponent); }

    ngOnInit() {
        this.custgroup = this.holderService.cadastroLinha.custGrp;
    }

    public setCustgroup() {
        if (this.custgroup) {
            this.nomeButton = "Alterando custgroup, Agurde...";
            this.disableButton = true;
            this.custgroupService.setCustGroup(this.holderService.cadastro.linha, this.custgroup)
                .then(data => {
                    this.holderService.cadastroLinha = data;
                    this.nomeButton = "Alterar";
                    this.disableButton = false;
                    super.callToasty("Sucesso.", "Custgroup Alterado com sucesso.", "success", 5000);
                }, error => {
                    super.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                    this.nomeButton = "Alterar";
                    this.disableButton = false;
                });
        } else {
            super.callToasty("Ops, aconteceu algo.", "Preencha o campo Custgroup", "error", 5000);
        }

    }
}
import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemholder.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { LogListManobraService } from './log-list-manobra.service';

import * as moment from 'moment';

@Component({
    selector: 'log-list-manobra-component',
    templateUrl: 'log-list-manobra.component.html',
    styleUrls: ['log-list-manobra.component.css'],
    providers: [LogListManobraService]
})

export class LogListManobraComponent extends SuperComponentService implements OnInit {

    public isLoading: boolean = false;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        private logListManobraService: LogListManobraService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.variavelHolderService.listCertificationManobra) {
            this.doFindManobraByCustomer();
        }
    }

    private doFindManobraByCustomer() {
        if (this.systemHolderService.ableMock) {
            this.findManobraByCustomerMock();
        } else {
            this.findManobraByCustomer();
        }
    }

    private findManobraByCustomer() {
        this.isLoading = true;
        this.logListManobraService
            .findManobraByCustomer(this.variavelHolderService.cadastro)
            .then(resposta => {
                if (resposta.length > 0) {
                    this.variavelHolderService.listCertificationManobra = resposta; //_.orderBy(resposta, "dataInicio", ['desc']);
                } else {
                    super.callAlert("alert-warning", "Não encontrados nenhum log de Fulltest Manobra.");
                }
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            })

    }

    private findManobraByCustomerMock() {
        this.variavelHolderService.listCertificationManobra = this.logListManobraService.findManobraByCustomerMock();
    }

    public validdatedif(end: number): string {
        let valid: string;
        if (Math.abs(moment().diff(end)) < 600000) { // 10 Minutos
            valid = "Valido";
        } else {
            valid = "Expirado";
        }
        return valid;
    }

}
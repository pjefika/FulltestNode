import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { LogListCertificationService } from './log-list-certification.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { Certification } from '../../viewmodel/fulltest/certification';

// import * as _ from "lodash";

import * as moment from 'moment';
import { SystemHolderService } from '../../util/holder/systemholder.service';
import { Valid } from '../../viewmodel/valid/valid';
import { Fulltest } from '../../viewmodel/fulltest/fulltest';
import { Block } from '../../viewmodel/block/block';

@Component({
    selector: 'log-list-certification-component',
    templateUrl: 'log-list-certification.component.html',
    styleUrls: ["log-list-certification.component.css"],
    providers: [LogListCertificationService]
})

export class LogListCertificationComponent extends SuperComponentService implements OnInit {

    public isLoading: boolean = false;

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
            this.getCertificationByCustomer();
        }
    }

    private getCertificationByCustomer() {
        this.isLoading = true;
        this.logListCertificationService
            .getCertificationByCustomer(this.variavelHolderService.cadastro.instancia)
            .then(resposta => {
                if (resposta.length > 0) {
                    this.variavelHolderService.listCertifications = resposta; //_.orderBy(resposta, "dataInicio", ['desc']);
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
    }

    private validdatedif(end: number): string {
        let valid: string;
        if (Math.abs(moment().diff(end)) < this.systemHolderService.historyCertificationValidTime) {
            valid = "Valido";
        } else {
            valid = "Expirado";
        }
        return valid;
    }

    private validtodisablefinalize(end: number) {
        let valid: boolean = false;
        if (this.validdatedif(end) === "Expirado") {
            valid = true;
        }
        return valid;
    }

    private validtodisableifclicked() {

    }

    public validarMacTrocaModem(certification: Certification): boolean {
        let t: boolean = false;
        if (certification.fulltest && certification.fulltest.valids) {
            certification.fulltest.valids.forEach(e => {
                if (e && e.nome === "MAC do Equipamento" && e.mensagem.includes("(MODEM TROCADO)")) {
                    t = true;
                }
            });
        }
        return t;
    }

    public validarShowBlockHPNA(blocks: Block[]): boolean {
        let t: boolean = false;
        if (blocks) {
            blocks.forEach(e => {
                if (e.nome.name === "HPNA") {
                    t = true;
                }
            });
        }
        return t;
    }

    public validBlockHPNAGetName(blocks: Block[]): string {
        let m: string;
        blocks.forEach(e => {
            if (e.nome.name === "HPNA") {
                m = e.orientacao;
            }
        });
        return m;
    }

    public dateFimValid() {
        
    }

}
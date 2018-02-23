import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { AcsService } from './acs.service';

@Component({
    selector: 'acs-component',
    templateUrl: 'acs.component.html',
    styleUrls: ['acs.component.css'],
    providers: [AcsService]
})

export class AcsComponent extends SuperComponentService implements OnInit {

    @Input() public designador: string;

    private isLoading: boolean = false;

    constructor(private acsService: AcsService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.systemHolderService.jaPesquisouAcs) {
            this.doGetEquipamentoAssoc();
        } else {
            super.callAlert(this.systemHolderService.mensagemAlertAcs.type, this.systemHolderService.mensagemAlertAcs.msg);
        }
    }

    private doGetEquipamentoAssoc() {
        if (this.systemHolderService.ableMock) {
            // this.getEquipamentoAssocMock();
            this.getEquipamentoAssoc();
        } else {
            this.getEquipamentoAssoc();
        }
    }

    private getEquipamentoAssoc() {
        this.variavelHolderService.equipamento = null;
        this.isLoading = true;
        this.acsService
            .getEquipamentoAssoc(this.designador)
            .then(resposta => {
                this.variavelHolderService.equipamento = resposta;
            }, erro => {
                super.callAlert("alert-warning", "Cliente não possui equipamento associado na motive.");
                this.systemHolderService.mensagemAlertAcs = { type: "alert-warning", msg: "Cliente não possui equipamento associado na motive." };
            })
            .then(() => {
                this.isLoading = false;
                this.systemHolderService.jaPesquisouAcs = true;
            });
    }

    private getEquipamentoAssocMock() {
        this.variavelHolderService.equipamento = null;
        this.isLoading = true;
        setTimeout(() => {
            this.variavelHolderService.equipamento = this.acsService.getEquipamentoAssocMock();
            this.isLoading = false;
        }, 1000);
    }

    private abreSearchDevice(deviceId: number) {
        this.acsService.abreSearchDevice(deviceId);
    }

}
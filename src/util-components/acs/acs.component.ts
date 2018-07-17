import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { AcsService } from './acs.service';
import { SystemHolderService } from '../../util/holder/systemholder.service';

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
            this.mountAlert();
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
        this.variavelHolderService.equipamentos = null;
        this.isLoading = true;
        this.acsService
            .getEquipamentoAssoc(this.designador)
            .then(resposta => {
                this.variavelHolderService.equipamentos = resposta;
            }, erro => {
                this.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
                this.mountAlert();
            })
            .then(() => {
                this.isLoading = false;
                this.systemHolderService.jaPesquisouAcs = true;
            });
    }

    private getEquipamentoAssocMock() {
        this.variavelHolderService.equipamentos = null;
        this.isLoading = true;
        setTimeout(() => {
            this.variavelHolderService.equipamentos = this.acsService.getEquipamentoAssocMock();
            this.isLoading = false;
        }, 1000);
    }

    private abreSearchDevice(deviceId: number) {
        this.acsService.abreSearchDevice(deviceId);
    }

    private mountAlert() {
        if (!this.variavelHolderService.equipamentos) {
            super.callAlert("alert-warning", "Cliente não possui equipamento associado na motive.");
        }
    }

}
import { HolderService } from 'util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { AcsService } from 'util/comp_complementares/acs/acs.service';
import { Equipamento } from 'viewmodel/acs/equipamento';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'acs-component',
    templateUrl: 'acs.component.html',
    styleUrls: ['acs.component.css'],
    providers: [AcsService]
})

export class AcsComponent extends CallAlertService implements OnInit {

    @Input() public designador: string;

    @Input() public searching?: boolean = false;

    constructor(
        private acsService: AcsService,
        public toastyComponent: ToastyComponent,
        public holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getEquipamentoAssoc();
    }

    private getEquipamentoAssoc() {
        this.holderService.equipamentos = null;
        this.searching = true;
        super.setFalseAlert();
        this.acsService
            .getEquipamentoAssoc(this.designador)
            .then(data => {
                this.holderService.equipamentos = data;                
            }, error => {
                super.callAlert(true, "alert-warning", "Cliente não possui equipamento associado na motive.");
            })
            .then(() => {
                this.searching = false;
            });
    }

    private abreAbaSearchDeviceInfo(deviceId: number) {
        this.acsService.abreSearchDevice(deviceId);
    }

}
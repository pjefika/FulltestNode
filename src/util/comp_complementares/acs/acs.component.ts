import { HolderService } from 'util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { AcsService } from 'util/comp_complementares/acs/acs.service';
import { Equipamento } from 'viewmodel/acs/equipamento';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'acs-component',
    templateUrl: 'acs.component.html',
    styleUrls: ['acs.component.css'],
    providers: [AcsService]
})

export class AcsComponent implements OnInit {

    @Input() public designador: string;

    @Input() public searching?: boolean = false;

    constructor(
        private acsService: AcsService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) {
    }

    public ngOnInit() {

        this.holderService.equipamentos = this.acsService.getMock();
        // this.getEquipamentoAssoc();
    }

    private getEquipamentoAssoc() {
        this.holderService.equipamentos=null;
        this.searching = true;
        this.acsService
            .getEquipamentoAssoc(this.designador)
            .then(data => {
                this.holderService.equipamentos = data;
            }, error => {
                //this.callToasty("Ops, aconteceu algo.", error.mError, "warning", 5000);
            })
            .then(() => {
               this.searching = false;
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    private abreAbaSearchDeviceInfo(deviceId: number) {
        this.acsService.abreSearchDevice(deviceId);
    }

}
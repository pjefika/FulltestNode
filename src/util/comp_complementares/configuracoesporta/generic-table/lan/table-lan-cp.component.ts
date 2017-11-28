import { Component, OnInit, Input } from '@angular/core';
import { VlanBanda } from 'viewmodel/confPorta/vlanBanda';
import { VlanVoip } from 'viewmodel/confPorta/vlanVoip';
import { VlanVod } from 'viewmodel/confPorta/vlanVod';
import { VlanMulticast } from 'viewmodel/confPorta/vlanMulticast';
import { HolderService } from 'util/holder/holder.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { TableLanCpService } from 'util/comp_complementares/configuracoesporta/generic-table/lan/table-lan-cp.service';

@Component({
    selector: 'table-lan-cp-component',
    templateUrl: 'table-lan-cp.component.html',
    styleUrls: ['table-lan-cp.component.css'],
    providers: [TableLanCpService]
})

export class TableLanCpComponent extends CallAlertService implements OnInit {

    @Input() public vlanBanda: VlanBanda;
    @Input() public vlanVoip: VlanVoip;
    @Input() public vlanVod: VlanVod;
    @Input() public vlanMulticast: VlanMulticast;

    private btnSetVlanBandaName: string = "Configurar Vlan Banda";
    private btnSetVlanBandaDisable: boolean = false;

    private btnSetVlanMulticastName: string = "Configurar Vlan Multicast";
    private btnSetVlanMulticastDisable: boolean = false;

    private btnSetVlanVodName: string = "Configurar Vlan Vod";
    private btnSetVlanVodDisable: boolean = false;

    private btnSetVlanVoipName: string = "Configurar Vlan Voip";
    private btnSetVlanVoipDisable: boolean = false;

    constructor(private holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private tableLanCpService: TableLanCpService) {
        super(toastyComponent);
    }

    public ngOnInit() { }

    public setVlanBanda() {
        this.btnSetVlanBandaName = "Aguarde...";
        this.btnSetVlanBandaDisable = true;
        this.tableLanCpService
            .setVlanGeneric(this.holderService.cadastro, "setVlanBanda")
            .then(data => {
                this.vlanBanda = data;
                this.btnSetVlanBandaName = "Configurar Vlan Banda";
                this.btnSetVlanBandaDisable = false;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanBandaName = "Configurar Vlan Banda";
                this.btnSetVlanBandaDisable = false;
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanMulticast() {
        this.btnSetVlanMulticastName = "Aguarde...";
        this.btnSetVlanMulticastDisable = true;
        this.tableLanCpService
            .setVlanGeneric(this.holderService.cadastro, "setVlanMulticast")
            .then(data => {
                this.vlanMulticast = data;
                this.btnSetVlanMulticastName = "Configurar Vlan Multicast";
                this.btnSetVlanMulticastDisable = false;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanMulticastName = "Configurar Vlan Multicast";
                this.btnSetVlanMulticastDisable = false;
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanVod() {
        this.btnSetVlanVodName = "Aguarde...";
        this.btnSetVlanVodDisable = true;
        this.tableLanCpService
            .setVlanGeneric(this.holderService.cadastro, "setVlanVod")
            .then(data => {
                this.vlanVod = data;
                this.btnSetVlanVodName = "Configurar Vlan Vod";
                this.btnSetVlanVodDisable = false;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanVodName = "Configurar Vlan Vod";
                this.btnSetVlanVodDisable = false;
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanVoip() {
        this.btnSetVlanVoipName = "Aguarde...";
        this.btnSetVlanVoipDisable = true;
        this.tableLanCpService
            .setVlanGeneric(this.holderService.cadastro, "setVlanVoip")
            .then(data => {
                this.vlanVoip = data;
                this.btnSetVlanVoipName = "Configurar Vlan Voip";
                this.btnSetVlanVoipDisable = false;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanVoipName = "Configurar Vlan Voip";
                this.btnSetVlanVoipDisable = false;
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    private validSeExiste(frase: string): Boolean {
        let valid: Boolean = true;
        if (frase.indexOf("Cliente sem") !== -1) {
            valid = false;
        }
        return valid;
    }

}
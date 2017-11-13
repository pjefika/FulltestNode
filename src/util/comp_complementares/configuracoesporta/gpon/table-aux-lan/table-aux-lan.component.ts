import { log } from 'util';
import { ToastyComponent } from './../../../../toasty/toasty.component';
import { HolderService } from './../../../../holder/holder.service';
import { TableAuxLanService } from './table-aux-lan.service';
import { ConfPorta } from './../../../../../viewmodel/confPorta/confPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-lan-component',
    templateUrl: 'table-aux-lan.component.html',
    styleUrls: ['table-aux-lan.component.css'],
    providers: [TableAuxLanService]
})

export class TableAuxLanComponent implements OnInit {

    @Input() public confPorta: ConfPorta;

    private btnSetVlanBandaName: string = "Configurar Vlan Banda";
    private btnSetVlanBandaDisable: boolean = false;

    private btnSetVlanMulticastName: string = "Configurar Vlan Multicast";
    private btnSetVlanMulticastDisable: boolean = false;

    private btnSetVlanVodName: string = "Configurar Vlan Vod";
    private btnSetVlanVodDisable: boolean = false;

    private btnSetVlanVoipName: string = "Configurar Vlan Voip";
    private btnSetVlanVoipDisable: boolean = false;

    constructor(
        private tableAuxLanService: TableAuxLanService,
        private holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    public setVlanBanda() {
        this.btnSetVlanBandaName = "Aguarde...";
        this.btnSetVlanBandaDisable = true;
        this.tableAuxLanService
            .setVlanGeneric(this.holderService.cadastro, "setVlanBanda")
            .then(data => {
                this.confPorta.vlanBanda = data;
                this.btnSetVlanBandaName = "Configurar Vlan Banda";
                this.btnSetVlanBandaDisable = false;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanBandaName = "Configurar Vlan Banda";
                this.btnSetVlanBandaDisable = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanMulticast() {
        this.btnSetVlanMulticastName = "Aguarde...";
        this.btnSetVlanMulticastDisable = true;
        this.tableAuxLanService
            .setVlanGeneric(this.holderService.cadastro, "setVlanMulticast")
            .then(data => {
                this.confPorta.vlanMulticast = data;
                this.btnSetVlanMulticastName = "Configurar Vlan Multicast";
                this.btnSetVlanMulticastDisable = false;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanMulticastName = "Configurar Vlan Multicast";
                this.btnSetVlanMulticastDisable = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanVod() {
        this.btnSetVlanVodName = "Aguarde...";
        this.btnSetVlanVodDisable = true;
        this.tableAuxLanService
            .setVlanGeneric(this.holderService.cadastro, "setVlanVod")
            .then(data => {
                this.confPorta.vlanVod = data;
                this.btnSetVlanVodName = "Configurar Vlan Vod";
                this.btnSetVlanVodDisable = false;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanVodName = "Configurar Vlan Vod";
                this.btnSetVlanVodDisable = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public setVlanVoip() {
        this.btnSetVlanVoipName = "Aguarde...";
        this.btnSetVlanVoipDisable = true;
        this.tableAuxLanService
            .setVlanGeneric(this.holderService.cadastro, "setVlanVoip")
            .then(data => {
                this.confPorta.vlanVoip = data;
                this.btnSetVlanVoipName = "Configurar Vlan Voip";
                this.btnSetVlanVoipDisable = false;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.btnSetVlanVoipName = "Configurar Vlan Voip";
                this.btnSetVlanVoipDisable = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
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

    private validSeExiste(frase: string): Boolean {
        let valid: Boolean = true;
        if (frase.indexOf("Cliente sem") !== -1) {
            valid = false;
        }
        return valid;
    }

}
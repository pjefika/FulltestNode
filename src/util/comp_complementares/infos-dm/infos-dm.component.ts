import { Component, OnInit } from '@angular/core';
import { Cadastro } from 'viewmodel/cadastro/cadastro';
import { HolderService } from 'util/holder/holder.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'infos-dm-component',
    templateUrl: 'infos-dm.component.html',
    styleUrls: ['infos-dm.component.css']
})

export class InfosDmComponent extends CallAlertService implements OnInit {

    private modalInfoDm: boolean = false;

    private infoDm: string;

    private arrayInfo: string[] = [];

    private cadastro: Cadastro;

    constructor(public holderService: HolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { }

    private setInfosDm() {
        let caminho: string;
        this.arrayInfo = this.infoDm.split("\n").map(function (item) {
            if (item === "OLT") {
                caminho = "olt";
            }
            if (item === "DSLAM") {
                caminho = "dslam";
            }
            return item.trim();
        });

        if (caminho === "olt") {
            this.findOltCad();
        } else if (caminho === "dslam") {
            this.findDlsamCad();
        } else {
            super.callToasty("Ops aconteceu algo", "Funcionalidade não implementada, para este tipo de DSLAM", "error", 6000);
        }
    }

    private findOltCad() {
        console.log("Entrou Olt");
        //console.log(this.arrayInfo);
        this.cadastro = {
            instancia: this.findNextIndex("Terminal/Id Fibra:"),
            designador: this.holderService.cadastro.designador,
            designadorAcesso: this.holderService.cadastro.designadorAcesso,
            rede: {
                tipo: "Gpon",
                origem: "Manual",
                planta: "VIVO1",
                ipDslam: this.findNextIndex("Nome Rede:"),
                vendorDslam: this.findNextIndex("Fabricante:"),
                modeloDslam: this.findNextIndex("Modelo OLT:"),
                idOnt: this.findNextIndex("ID ONT:"),
                terminal: this.findNextIndex("Telefone/LP:"),
                slot: Number(this.findNextIndex("Slot:")),
                porta: Number(this.findNextIndex("Porta PON:")),
                sequencial: Number(this.findNextIndex("ID Cliente:")),
                logica: Number(this.findNextIndex("ID Cliente:")),
                rin: Number(this.findNextIndex("Vlan de Rede:")),
                vlanVoip: Number(this.findNextIndex("Vlan de Voz:")),
                vlanMulticast: Number(this.findNextIndex("Vlan de Multicast:")),
                vlanVod: Number(this.findNextIndex("Vlan de Multicast:")),
                cvLan: Number(this.findNextIndex("Vlan de Usuário:")),
                bhs: true
            },
            servicos: {
                velDown: Number(this.findNextIndex("Velocidade Down/Up:").split("/").shift()),
                velUp: Number(this.findNextIndex("Velocidade Down/Up:").split("/").pop()),
                tipoLinha: "SIP",
                tipoTv: ""
            },
            asserts: this.holderService.cadastro.asserts,
            linha: this.holderService.cadastro.linha
        }
        this.holderService.cadastro = this.cadastro;
        this.modalInfoDm = false;
        //console.log(this.cadastro);
    }

    private findDlsamCad() {
        console.log("Entrou Dslam");
        // console.log(this.arrayInfo);
        super.callToasty("Ops aconteceu algo", "Funcionalidade não implementada, para este tipo de DSLAM", "error", 6000);
    }


    private findNextIndex(campo: string): string {
        let index = this.arrayInfo.indexOf(campo);
        if (index >= 0 && index < this.arrayInfo.length - 1) {
            return this.arrayInfo[index + 1];
        }
    }


}
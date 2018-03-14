import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';

@Component({
    selector: 'info-dm-component',
    templateUrl: 'info-dm.component.html'
})

export class InfoDmComponent extends SuperComponentService implements OnInit {

    private infoDm: string;
    private arrayInfo: string[] = [];

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    private setInfosDm() {
        let caminho: string;
        if (this.infoDm) {
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
        } else {
            super.callToasty("Ops aconteceu algo", "Por favor preencha o campo de texto com as informações necessárias", "error", 6000);
        }
    }

    private findOltCad() {
        this.variavelHolderService.cadastro = {
            designador: this.variavelHolderService.cadastro.designador,
            instancia: this.findNextIndex("Telefone/LP:"),
            designadorAcesso: this.variavelHolderService.cadastro.designadorAcesso,
            designadorTv: null,
            rede: {
                tipo: "GPON",
                origem: "OFFLINE",
                planta: "VIVO1",
                ipDslam: this.findNextIndex("Nome Rede:"),
                vendorDslam: this.findNextIndex("Fabricante:"),
                modeloDslam: this.findNextIndex("Modelo OLT:"),
                idOnt: this.findNextIndex("ID ONT:"),
                terminal: this.findNextIndex("Terminal/ID ACESSO:"),
                ipMulticast: null,
                nrc: null,
                slot: Number(this.findNextIndex("Slot:")),
                porta: Number(this.findNextIndex("Porta PON:")),
                sequencial: Number(this.findNextIndex("ID Cliente:")),
                logica: Number(this.findNextIndex("ID Cliente:")),
                rin: Number(this.findNextIndex("Vlan de Rede:")),
                vlanVoip: Number(this.findNextIndex("Vlan de Voz:")),
                vlanVod: Number(this.findNextIndex("Vlan de Multicast:")),
                vlanMulticast: Number(this.findNextIndex("Vlan de Multicast:")),
                cvlan: Number(this.findNextIndex("Vlan de Usuário:")),
                bhs: "true"
            },
            servicos: {
                origem: null,
                velDown: Number(this.findNextIndex("Velocidade Down/Up:").split("/").shift()),
                velUp: Number(this.findNextIndex("Velocidade Down/Up:").split("/").pop()),
                tipoTv: null,
                tipoLinha: "SIP"
            },
            linha: this.variavelHolderService.cadastro.linha,
            asserts: [],
            eventos: []
        }
        this.systemHolderService.modalWizardCadastroIsOpen = true;
        this.systemHolderService.modalInfoDMIsOpen = false;
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
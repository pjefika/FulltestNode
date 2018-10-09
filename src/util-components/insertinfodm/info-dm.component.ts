import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { SystemHolderService } from '../../util/holder/systemholder.service';

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

    public setInfosDm() {
        // console.log(this.infoDm);

        let caminho: string;
        if (this.infoDm) {
            this.arrayInfo = this.infoDm.split("\n").map(function (item) {
                // console.log(item);
                if (item === "OLT") {
                    caminho = item;
                }
                if (item === "DSLAM") {
                    caminho = item;
                }
                return item.trim();
            });
            if (!this.validIfExist(caminho)) {
                caminho = null;
            }
            switch (caminho) {
                case "OLT":
                    this.findOltCad();
                    break;
                case "DSLAM":
                    this.findDlsamCad();
                    break;
                default:
                    super.callToasty("Ops aconteceu algo", "Por favor verifique os dados colados, pois não identificamos padrões do cadastro.", "error", 6000);
                    break;
            }
        } else {
            super.callToasty("Ops aconteceu algo", "Por favor preencha o campo de texto com as informações necessárias", "error", 6000);
        }
    }

    private findOltCad() {
        this.variavelHolderService.cadastro = {
            designador: this.variavelHolderService.cadastro.designador,
            instancia: this.findNextIndex("Terminal/ID ACESSO:"),
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
                velDown: this.validVelocidade(Number(this.findNextIndex("Velocidade Down/Up:").split("/").shift()), "down"),
                velUp: this.validVelocidade(Number(this.findNextIndex("Velocidade Down/Up:").split("/").pop()), "up"),
                tipoTv: null,
                tipoLinha: "SIP"
            },
            linha: this.variavelHolderService.cadastro.linha,
            asserts: [],
            eventos: []
        }
        this.systemHolderService.modalWizardCadastroIsOpen = true;
        this.systemHolderService.modalInfoDMIsOpen = false;
        this.infoDm = null;
        // console.log(this.variavelHolderService.cadastro);
    }

    private findDlsamCad() {
        this.variavelHolderService.cadastro = {
            designador: this.variavelHolderService.cadastro.designador,
            instancia: this.findNextIndex("Terminal/ID ACESSO:"),
            designadorAcesso: this.variavelHolderService.cadastro.designadorAcesso,
            designadorTv: null,
            rede: {
                tipo: "METALICA",
                origem: "OFFLINE",
                planta: "VIVO1",
                ipDslam: this.findNextIndex("Dados Ip Rede :"),
                vendorDslam: this.findNextIndex("Dados Fabricante :"),
                modeloDslam: this.findNextIndex("Dados Modelo :"),
                idOnt: null,
                terminal: this.findNextIndex("Telefone/LP:"),
                ipMulticast: null,
                nrc: null,
                slot: Number(this.doSplit(this.findNextIndex("Dados Slot :"))),
                porta: Number(this.findNextIndex("Dados Porta :")),
                sequencial: null,
                logica: null,
                rin: Number(this.findNextIndex("ZVpi :")),
                vlanVoip: null,
                vlanVod: null,
                vlanMulticast: null,
                cvlan: Number(this.findNextIndex("ZVci :")),
                bhs: null
            },
            servicos: {
                origem: null,
                velDown: this.validVelocidade(Number(this.findNextIndex("Velocidade Down/Up:").split("/").shift()), "down"),
                velUp: this.validVelocidade(Number(this.findNextIndex("Velocidade Down/Up:").split("/").pop()), "up"),
                tipoTv: null,
                tipoLinha: "TDM"
            },
            linha: this.variavelHolderService.cadastro.linha,
            asserts: [],
            eventos: []
        }
        this.systemHolderService.modalWizardCadastroIsOpen = true;
        this.systemHolderService.modalInfoDMIsOpen = false;
        this.infoDm = null;
        // console.log(this.variavelHolderService.cadastro);
    }

    private findNextIndex(campo: string): string {
        let c: string;
        if (campo === "Telefone / ID ACESSO:" && this.variavelHolderService.cadastro.instancia) {





            // // console.log(this.arrayInfo);
            // this.arrayInfo.forEach(e => {
            //     // let index = e.search("Telefone / ID ACESSO:");
            //     console.log(e.includes("Telefone / ID ACESSO:"));
            //     // if (index >= 0 && index < (this.arrayInfo.length - 1)) {
            //     //     console.log(this.arrayInfo[index]);

            //     //     c = this.arrayInfo[index].split(" ")[4];
            //     // }
            // });
        } else {
            let index = this.arrayInfo.indexOf(campo);
            if (index >= 0 && index < (this.arrayInfo.length - 1)) {
                c = this.arrayInfo[index + 1];
            }
        }
        return c;
    }

    private validVelocidade(vel: number, what: string): number {
        switch (what) {
            case "down":
                if (vel) {
                    return vel;
                } else {
                    return this.variavelHolderService.cadastro.servicos.velDown;
                }
            case "up":
                if (vel) {
                    return vel;
                } else {
                    return this.variavelHolderService.cadastro.servicos.velUp;
                }
        }
    }

    private doSplit(campo: string): string {
        let valueR: string;
        if (campo.search("-") !== -1) {
            valueR = campo.split("-").shift();
        } else {
            valueR = campo;
        }
        return valueR;
    }

    private voltar() {
        this.systemHolderService.modalWizardCadastroIsOpen = true;
        this.systemHolderService.modalInfoDMIsOpen = false;
    }

    private validIfExist(caminho: string): boolean {
        let valid: boolean = false;
        switch (caminho) {
            case "OLT":
                if (this.findNextIndex("Nome Rede:")) {
                    valid = true;
                }
                break;
            case "DSLAM":
                if (this.findNextIndex("Dados Ip Rede :")) {
                    valid = true;
                }
                break;
        }
        return valid;
    }

}
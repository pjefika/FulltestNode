import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { Valid } from '../../../../viewmodel/valid/valid';
import { FulltestVlanService } from './fulltest-vlan.service';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-vlan-component',
    templateUrl: 'fulltest-vlan.component.html',
    providers: [FulltestVlanService]
})

export class FulltestVlanComponent extends SuperComponentService implements OnInit {

    @Input() public vlan: Valid;

    private btnSetVlanDisabled: boolean = false;
    private btnSetVlanName: string = "Configurar Vlan";

    private btnResetVlanDisabled: boolean = false;
    private btnResetVlanName: string = "Resetar Vlan's";

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        private fulltestVlanService: FulltestVlanService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

    public qualVlan(nome: string) {
        switch (nome) {
            case "Vlan Banda Larga":
                this.genericSetVla("setVlanBanda", "Banda");
                break;
            case "Vlan VoIP":
                this.genericSetVla("setVlanVoip", "VOIP");
                break;
            case "Vlan VoD/IPTV":
                this.genericSetVla("setVlanVod", "VOD");
                break;
            case "Vlan Multicast":
                this.genericSetVla("setVlanMulticast", "Multicast");
                break;
        }
    }

    private genericSetVla(whatSet: string, nameSet: string) {
        this.btnSetVlanName = "Configurando Vlan de " + nameSet + "...";
        this.btnSetVlanDisabled = true;
        this.fulltestVlanService
            .setVlanGeneric(this.variavelHolderService.cadastro, whatSet)
            .then(data => {
                this.vlan = data;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.btnSetVlanName = "Configurar Vlan";
                this.btnSetVlanDisabled = false;
            });
    }

    private resetIptvStatistics() {
        this.btnResetVlanName = "Resetando Vlan de MultiCast e VOD...";
        this.btnResetVlanDisabled = true;
        this.fulltestVlanService
            .resetIptvStatistics(this.variavelHolderService.cadastro)
            .then(data => {
                this.setInfosVlanMultiCastEVOD(data);
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.btnResetVlanName = "Resetar Vlan's";
                this.btnResetVlanDisabled = false;
            });
    }

    private setInfosVlanMultiCastEVOD(data: any[]) {
        data.forEach(element => {
            if (element.nome === "Vlan VoD/IPTV") {
                this.vlan = element;
            }
            if (element.nome === "Vlan Multicast") {
                this.vlan = element;
            }
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
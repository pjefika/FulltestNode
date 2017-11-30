import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'viewmodel/confPorta/profiles';
import { TableProfileCpService } from 'util/comp_complementares/configuracoesporta/generic-table/profile/table-profile-cp.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'table-profile-cp-component',
    templateUrl: 'table-profile-cp.component.html',
    styleUrls: ['table-profile-cp.component.css'],
    providers: [TableProfileCpService]
})

export class TableProfileCpComponent extends CallAlertService implements OnInit {

    private btnSetProfileName: string = "Executar";
    private btnSetProfileDisable: boolean = false;
    private isMetalico: boolean = false;
    private thDown: string = "Profile Down:";

    private changeProfile: boolean = false;

    @Input() public profile: Profile;

    constructor(
        public toastyComponent: ToastyComponent,
        private tableProfileCpService: TableProfileCpService,
        public holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        if (this.holderService.cadastro.rede.tipo === "METALICA") {
            this.isMetalico = true;
            this.thDown = "Profile:";
        }
    }

    public setProfile() {
        this.btnSetProfileName = "Aguarde...";
        this.btnSetProfileDisable = true;
        this.tableProfileCpService
            .setProfile(this.holderService.cadastro, this.profile.atual.result)
            .then(data => {
                this.profile.atual.resultado = data;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
                this.btnSetProfileName = "Executar";
                this.btnSetProfileDisable = false;
            }, error => {
                this.btnSetProfileName = "Executar";
                this.btnSetProfileDisable = false;
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

}
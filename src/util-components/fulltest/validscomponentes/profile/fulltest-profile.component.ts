import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';
import { Valid } from '../../../../viewmodel/valid/valid';
import { Profile } from '../../../../viewmodel/confporta/profile';
import { FulltestProfileService } from './fulltest-profile.service';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';

@Component({
    selector: 'fulltest-profile-component',
    templateUrl: 'fulltest-profile.component.html',
    providers: [FulltestProfileService]
})

export class FulltestProfileComponent extends SuperComponentService implements OnInit {

    @Input() public profile?: Valid;

    @Input() public profileConfPorta?: Profile;

    private setProfileBtnDisable: boolean = false;
    private setProfileBtnName: string = "Alterar Profile";

    private labelNameProfile: string;
    private isMetalico: boolean = false;

    constructor(private fulltestProfileService: FulltestProfileService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (this.profileConfPorta && !this.profile) {
            this.profile = this.profileConfPorta.atual;
        }
        this.mountProfileRNCase();
    }

    private mountProfileRNCase() {
        if (this.variavelHolderService.cadastro.rede.tipo === "METALICA") {
            this.isMetalico = true;
            this.labelNameProfile = "Profile";
        } else {
            this.labelNameProfile = "Profile Down";
        }
    }

    private stringVelocidade(vel: string) {
        let vels = vel.match("[^a-z_ ]\\ *([.0-9])*\\d");
        return vels[0];
    }

    private doSetProfile() {
        if (this.systemHolderService.ableMock) {
            this.setProfileMock();
        } else {
            this.setProfile();
        }
    }

    private setProfile() {
        this.setProfileBtnDisable = true;
        this.setProfileBtnName = "Aguarde...";
        this.fulltestProfileService
            .setProfile(this.variavelHolderService.cadastro, this.profile.result)
            .then(resultado => {
                this.profile.result = resultado;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.setProfileBtnDisable = false;
                this.setProfileBtnName = "Alterar Profile";
            });
    }

    private setProfileMock() {
        this.setProfileBtnDisable = true;
        this.setProfileBtnName = "Aguarde...";
        setTimeout(() => {
            console.log(this.fulltestProfileService.setProfileMock());
            this.profile.result = this.fulltestProfileService.setProfileMock();
            this.setProfileBtnDisable = false;
            this.setProfileBtnName = "Alterar Profile";
        }, 1000);


    }

}
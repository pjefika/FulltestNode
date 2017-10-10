import { HolderService } from './../../../../holder/holder.service';
import { ToastyComponent } from './../../../../toasty/toasty.component';
import { TableAuxProfileService } from './table-aux-profile.service';
import { Profile } from './../../../../../viewmodel/confPorta/profiles';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-profile-component',
    templateUrl: 'table-aux-profile.component.html',
    styleUrls: ['table-aux-profile.component.css'],
    providers: [TableAuxProfileService]
})

export class TableAuxProfileComponent implements OnInit {

    private btnSetProfileName: string = "Executar";
    private btnSetProfileDisable: boolean = false;

    private changeProfile: boolean = false;

    @Input() public profile: Profile;

    constructor(
        private tableAuxProfileService: TableAuxProfileService,
        private holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    public setProfile() {
        this.btnSetProfileName = "Aguarde...";
        this.btnSetProfileDisable = true;
        this.tableAuxProfileService
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

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }
}
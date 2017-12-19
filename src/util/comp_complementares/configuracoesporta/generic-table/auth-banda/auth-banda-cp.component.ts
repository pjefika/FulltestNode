import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { AuthBanda } from 'viewmodel/confPorta/authBanda';
import { AuthBandaCpService } from 'util/comp_complementares/configuracoesporta/generic-table/auth-banda/auth-banda-cp.service';
import { DeviceMac } from 'viewmodel/confPorta/deviceMac';

@Component({
    selector: 'auth-banda',
    templateUrl: 'auth-banda-cp.component.html',
    styleUrls: ['auth-banda-cp.component.css'],
    providers: [AuthBandaCpService]
})

export class AuthBandaComponent extends CallAlertService implements OnInit {

    @Input() public deviceMac: DeviceMac;

    private actionBtn: boolean = false;
    private actionBtnName: string = "Consultar Autenticação";
    private authBanda: AuthBanda;


    constructor(public toastyComponent: ToastyComponent,
        private authBandaService: AuthBandaCpService,
        public holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.consultar();
        // for test purposes
        // this.authBanda = this.authBandaService.getMock();
    }

    public consultar() {
        this.actionBtn = true;
        this.actionBtnName = "Consultando Autenticação...";
        this.authBandaService
            .consultar(this.deviceMac.result)
            .then(data => {
                this.authBanda = data;
                this.actionBtn = false;
                this.actionBtnName = "Consultar Autenticação";
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000)
            }, error => {
                this.actionBtn = false;
                this.actionBtnName = "Consultar Autenticação";
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }

    public matchProfile(prof1: string, prof2: string) {
        let profile1 = prof1.match("\d+");
        let profile2 = prof2.match("\d+");

        return profile1 === profile2;

    }
}
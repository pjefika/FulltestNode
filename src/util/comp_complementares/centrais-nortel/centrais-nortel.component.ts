import { Component, OnInit } from '@angular/core';
import { CentraisNortelService } from 'util/comp_complementares/centrais-nortel/centrais-nortel.service';
import { InfoNortelConection } from 'viewmodel/nortel-conections/infos-nortel-conection';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';
import { InfoNC } from 'viewmodel/nortel-conections/infoNC';

import { StringFilter } from "clarity-angular";

class CentralConnectedFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        return "" + info.connected == search;
    }
}

class CentralNameFilter implements StringFilter<InfoNortelConection> {
    accepts(info: InfoNortelConection, search: string): boolean {
        return "" + info.central.toLowerCase() == search;
    }
}

@Component({
    selector: 'centrais-nortel-component',
    templateUrl: 'centrais-nortel.component.html',
    styleUrls: ['centrais-nortel.component.css'],
    providers: [CentraisNortelService]
})

export class CentraisNortelComponent extends CallAlertService implements OnInit {

    private centralConnectedFilter = new CentralConnectedFilter();

    private centralNameFilter = new CentralNameFilter();

    private infosNC: InfoNC;

    private listInfoNortelConection: InfoNortelConection[];

    private searchingNortelInfos: boolean = false;

    private btnSetConnection: boolean = false;

    private btnSetNameTrueConection: string = "Ativar Massivo";
    private btnSetNameFalseConection: string = "Desativar Massivo";

    private progressBarConnectDesconectSingle: boolean = false;

    constructor(
        private centraisNortelService: CentraisNortelService,
        public toastyComponent: ToastyComponent,
        public holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.getContextDMS();
    }

    private getContextDMS() {
        this.searchingNortelInfos = true;
        this.centraisNortelService
            .getContextDMS()
            .then(data => {
                this.listInfoNortelConection = data;
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            }).then(() => {
                this.addinfos();
                this.searchingNortelInfos = false;
            });
    }

    private connection(conec: string) {
        this.btnSetNameTrueConection = "Aguarde...";
        this.btnSetNameFalseConection = "Aguarde..."
        this.btnSetConnection = true;
        this.centraisNortelService
            .connection(conec)
            .then(data => {
                this.listInfoNortelConection = data;
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.btnSetNameTrueConection = "Ativar Massivo";
                this.btnSetNameFalseConection = "Desativar Massivo";
                this.btnSetConnection = false;
                this.addinfos();
            })
    }

    private connectSwitch(ip: string) {
        this.progressBarConnectDesconectSingle = true;
        this.centraisNortelService
            .connectSwitch(ip)
            .then(data => {
                this.getContextDMS();
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.progressBarConnectDesconectSingle = false;
            })
    }

    private disconnectSwitch(ip: string) {
        this.progressBarConnectDesconectSingle = true;
        this.centraisNortelService
            .disconnectSwitch(ip)
            .then(data => {
                this.getContextDMS();
            }, error => {
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            })
            .then(() => {
                this.progressBarConnectDesconectSingle = false;
            });
    }

    public addinfos() {
        this.infosNC = null;
        let qtdetrue = 0;
        let qtdefalse = 0;
        let cred;
        this.listInfoNortelConection.forEach(element => {
            cred = element.credencial;
            if (element.connected) {
                qtdetrue++;
            } else {
                qtdefalse++;
            }
        });
        this.infosNC = {
            credencial: cred,
            quantiadeTrue: qtdetrue,
            quantidadeFalse: qtdefalse
        }
    }

}
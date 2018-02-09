import { InfoNC } from './../viewmodel/nortel-conections/infoNC';
import { InfoNortelConection } from './../viewmodel/nortel-conections/infos-nortel-conection';
import { NortelConectionsService } from './../util/comp_complementares/nortel-conections/nortel-conections.service';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { HolderService } from './../util/holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { AdmService } from './adm.service';

@Component({
    selector: 'adm-component',
    templateUrl: 'adm.component.html',
    styleUrls: ['adm.component.css'],
    providers: [NortelConectionsService, AdmService]
})

export class AdmComponent extends CallAlertService implements OnInit {

    private isLoading: boolean = false;

    private testing: boolean = false;

    constructor(
        public holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private nortelConectionsService: NortelConectionsService,
        private admService: AdmService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.isLoading = true;
        setInterval(() => {
            if (!this.testing) {
                this.isLoading = true;
                this.testStealer();
            }
        }, 20000);
    }

    public testStealer() {
        this.testing = true;
        let dataInicio;
        let dataFim;
        dataInicio = new Date();
        let testIsOk: boolean = true;
        let sgns: number;

        this.admService
            .testStealer()
            .then(response => {
                dataFim = new Date();
                sgns = dataFim.valueOf() - dataFim.valueOf();
                if (sgns > 10) {
                    this.holderService.appLevelAlert = {
                        msg: "Detectado possivel lentidão em nossos sistemas, aguarde que já estamos verificando.",
                        type: "alert-warning"
                    };
                    this.holderService.appLevelAlertAtivo = true;
                    testIsOk = false;
                }
            }, error => {
                console.log(error.mError);
                this.holderService.appLevelAlert = {
                    msg: "Detectado possivel problema no sistema, aguarde que já estamos verificando.",
                    type: "alert-error"
                };
                this.holderService.appLevelAlertAtivo = true;
                testIsOk = false;
            })
            .then(() => {
                if (sgns < 5 && this.holderService.appLevelAlertAtivo) {
                    this.holderService.appLevelAlertAtivo = false;
                }
                this.testing = false;
                this.holderService.testeStealer = {
                    isOk: testIsOk,
                    time: sgns
                }
                this.isLoading = false;
            });
    } 
}
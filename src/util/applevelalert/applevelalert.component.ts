import { HolderService } from 'util/holder/holder.service';
import { Component, OnInit } from '@angular/core';
import { ToastyComponent } from '../toasty/toasty.component';
import { CallAlertService } from '../callalerts/call-alert.service';
import { AppLevelAlertService } from './applevelalert.service';
import { AppLevelAlert } from 'viewmodel/app-level-alert/appLevelAlert';
import { Util } from '../util';

@Component({
    selector: 'app-level-alert-component',
    templateUrl: 'applevelalert.component.html',
    styleUrls: ['applevelalert.component.css'],
    providers: [AppLevelAlertService]
})

export class AppLevelAlertComponent extends CallAlertService implements OnInit {

    private isLoading: boolean = false;

    private testing: boolean = false;

    constructor(public holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private appLevelAlertService: AppLevelAlertService,
        private util: Util) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.isLoading = true;
        setInterval(() => {
            if (!this.testing) {
                this.isLoading = true;
                this.testStealer();
                this.testVersion();
            }
        }, 20000);
    }

    private pageRefresh() {
        window.location.reload();
    }

    private actionButton(appLevelAlert: AppLevelAlert) {
        switch (appLevelAlert.btn.btnAction) {
            case "refresh":
                this.pageRefresh();
                break;
            case "action-new-link":
                window.open(appLevelAlert.btn.link, '_blank');
                break;
            case "action-component":
                
                break;
        }
    }

    public activateStackAppLevelAlert(appLevelAlert: AppLevelAlert) {
        if (!this.validaSeJaExiste(appLevelAlert)) {
            if (this.holderService.appLevelAlert) {
                this.holderService.appLevelAlert.push(appLevelAlert);
            } else {
                this.holderService.appLevelAlert = [appLevelAlert];
            }
        }
    }

    public deactivateStackAppLevelAlert(appLevelAlert: AppLevelAlert) {
        if (this.holderService.appLevelAlert) {
            this.holderService.appLevelAlert = this.holderService.appLevelAlert.filter(item => {
                if (item.msg != appLevelAlert.msg) {
                    return item
                }
            });
        }
    }

    private validaSeJaExiste(appLevelAlert: AppLevelAlert): boolean {
        let valid: boolean = false;
        if (this.holderService.appLevelAlert) {
            this.holderService.appLevelAlert.forEach(alert => {
                if (alert.msg === appLevelAlert.msg) {
                    valid = true;
                }
            });
        }
        return valid;
    }

    private testStealer() {
        let dataInicio;
        let dataFim;
        dataInicio = new Date();
        let sgns: number;
        this.testing = true;
        this.appLevelAlertService
            .testStealer()
            .then(response => {
                dataFim = new Date();
                sgns = dataFim.valueOf() - dataFim.valueOf();
            }, error => {
                this.activateStackAppLevelAlert({
                    msg: "Detectado possivel problema no sistema, aguarde que já estamos verificando.",
                    type: "danger"
                });
            })
            .then(() => {
                if (sgns < 5) {
                    this.moutMsgsToSliceTestStealer();
                } else if (sgns > 10) {
                    this.activateStackAppLevelAlert({
                        msg: "Detectado possivel lentidão em nossos sistemas, aguarde que já estamos verificando.",
                        type: "warning"
                    });
                }
                this.testing = false;
                this.isLoading = false;
            });
    }

    private moutMsgsToSliceTestStealer() {
        this.deactivateStackAppLevelAlert({
            msg: "Detectado possivel problema no sistema, aguarde que já estamos verificando.",
            type: "danger"
        });
        this.deactivateStackAppLevelAlert({
            msg: "Detectado possivel lentidão em nossos sistemas, aguarde que já estamos verificando.",
            type: "warning"
        });
    }

    private testVersion() {
        if (!this.util.isAtualizado()) {
            this.activateStackAppLevelAlert({
                msg: "Detectado possivel problema na versão do cliente, por favor atualize o navegador.",
                type: "warning",
                btn: {
                    btnAction: "refresh",
                    btnName: "Atualizar"
                }
            });
        }
    }


}
import { Component, OnInit } from '@angular/core';
import { FulltestService } from './fulltest.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css'],
    providers: [FulltestService]
})

export class FulltestComponent extends SuperComponentService implements OnInit {

    public isLoading: boolean = false;

    public btnFulltestDisable: boolean = false;

    public modalEventosMassivos: boolean = false;

    public whatisloading: string;

    constructor(private fulltestService: FulltestService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.variavelHolderService.idfulltest) {
            this.doCertification();
        } else {
            this.getCertificationCOnew(this.variavelHolderService.idfulltest);
        }
        super.enablebtnresumoinfo();
    }

    private doCertification() {
        // Valida qual view para saber qual certification ira fazer.
        switch (this.systemHolderService.qualView) {
            case "CO":
                if (this.systemHolderService.ableMock) {
                    this.getCertificationCOMock();
                } else {
                    // this.getCertificationCO();
                    this.setCertificationCOnewBanda();
                }
                break;
            case "CRM":
                if (this.systemHolderService.ableMock) {
                    // this.getCertificationCRMMock();
                    this.getCertificationCOMock();
                } else {
                    // this.getCertificationCRM();
                    this.getCertificationCO();
                }
                break;
        }
    }

    private doCertificationTV() {
        if (this.systemHolderService.ableMock) {

        } else {
            this.setCertificationCOnewTV();
        }
    }

    private getCertificationCO() {
        this.isLoading = true;
        this.systemHolderService.isFulltestRunning = true;
        /*
        * Envia com customer.... 
        */
        this.fulltestService
            .getCertificationCO(this.variavelHolderService.cadastro)
            .then(resposta => {
                if (super.ifIsFulltest(resposta)) {
                    this.variavelHolderService.certification = resposta;
                    if (this.variavelHolderService.certification.fulltest) {
                        this.systemHolderService.resultadoGlobalFulltest = this.variavelHolderService.certification.fulltest.resultado;
                    }
                } else {
                    super.callToasty("Ops, Aconteceu algo.", resposta.localizedMessage, "error", 5000);
                }
            }, erro => {
                super.callToasty("Ops, Aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
                this.systemHolderService.isFulltestRunning = false;
            });
    }

    private getCertificationCOMock() {
        this.isLoading = true;
        this.systemHolderService.isFulltestRunning = true;
        setTimeout(() => {
            this.variavelHolderService.certification = this.fulltestService.getCertificationCOMock();
            this.isLoading = false;
            this.systemHolderService.isFulltestRunning = false;
        }, 1000);
    }

    private setCertificationCOnewBanda() {
        this.setloadinginfo("Realizando Fulltest");
        this.fulltestService
            .setCertificationCOnew(this.variavelHolderService.cadastro, "BANDA")
            .then(resposta => {
                if (super.ifIsFulltest(resposta)) {
                    this.variavelHolderService.certification = resposta;
                    this.getCertificationCOnew(resposta.id);
                }
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.systemHolderService.isFulltestRunning = false;
            });
    }

    private setCertificationCOnewTV() {
        this.setloadinginfo("Realizando Fulltest");
        this.fulltestService
            .setCertificationCOnew(this.variavelHolderService.cadastro, "TV")
            .then(resposta => {
                if (super.ifIsFulltest(resposta)) {
                    this.variavelHolderService.certification = resposta;
                    this.getCertificationCOnew(resposta.id);
                }
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.systemHolderService.isFulltestRunning = false;
            });
    }

    private getCertificationCOnew(id: string) {
        this.setloadinginfo("Realizando Fulltest");
        this.variavelHolderService.idfulltest = id;
        let isexec: boolean = false;
        let getinfosinterval = setInterval(() => {
            if (isexec === false) {
                isexec = true;
                this.fulltestService
                    .getCertificationCOnew(id)
                    .then(resposta => {
                        if (resposta.fulltest) {
                            this.whatisloading = resposta.fulltest.mensagem;
                        }
                        this.variavelHolderService.certification = resposta;
                    }, error => {
                        super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 10000);
                        this.isLoading = false;
                        clearInterval(getinfosinterval);
                    })
                    .then(() => {
                        /**
                         * Parar a busca se terminado...
                         */
                        if (this.variavelHolderService.certification.fulltest) {
                            if (this.variavelHolderService.certification.fulltest.dataFim) {
                                this.isLoading = false;
                                clearInterval(getinfosinterval);
                            }
                        }
                        isexec = false;
                    });
            }
        }, 5000);
    }

    private setloadinginfo(msg: string) {
        this.isLoading = true;
        this.whatisloading = msg;
        this.systemHolderService.isFulltestRunning = true;
    }
}
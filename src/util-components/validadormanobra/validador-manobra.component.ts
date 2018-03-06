import { Component, OnInit } from '@angular/core';
import { ValidadorManobraService } from './validador-manobra.service';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { Motivo } from '../../viewmodel/manobrar/motivo';

@Component({
    selector: 'validador-manobra-component',
    templateUrl: 'validador-manobra.component.html',
    styleUrls: ['validador-manobra.component.css'],
    providers: [ValidadorManobraService]
})

export class ValidadorManobraComponent extends SuperComponentService implements OnInit {

    private ordem: string;
    private motivoSelected: string;

    private isLoadingGetValid: boolean = false;

    private listaMotivos: Motivo[];

    private btnValidarManobraName: string = "Validar Manobra";
    private btnValidarManobraDisabled: boolean = false;
    private btnValidarManobraLoading: boolean = false;

    private analiseIsDone: boolean = false;

    constructor(private validadorManobraService: ValidadorManobraService,
        public variavelHolderService: VariavelHolderService,
        public systemHolderService: SystemHolderService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (this.variavelHolderService.cadastro) {
            if (!this.variavelHolderService.certificationValidManobra) {
                this.doGetValidacao();
            } else {
                this.getListaMotivo();
                if (this.variavelHolderService.certificationValidManobraAnalitico) {
                    this.analiseIsDone = true;
                    this.mountValidatorAlert();
                }
            }
        }
        super.enablebtnresumoinfo();
    }

    private doGetValidacao() {
        if (this.systemHolderService.ableMock) {
            this.getListaMotivoMock();
            this.getValidacaoMock();
        } else {
            this.getListaMotivo();
            this.getValidacao();
        }
    }

    private getListaMotivo() {
        this.validadorManobraService
            .getListaMotivo()
            .then(resposta => {
                this.listaMotivos = resposta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            });
    }

    private getListaMotivoMock() {
        this.listaMotivos = this.validadorManobraService.getListaMotivoMock();
    }

    private getValidacao() {
        this.isLoadingGetValid = true;
        this.validadorManobraService
            .getValidacao(this.variavelHolderService.cadastro)
            .then(resposta => {
                this.variavelHolderService.certificationValidManobra = resposta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoadingGetValid = false;
            });
    }

    private getValidacaoMock() {
        this.isLoadingGetValid = true;
        setTimeout(() => {
            this.variavelHolderService.certificationValidManobra = this.validadorManobraService.getValidacaoMock();
            this.isLoadingGetValid = false;
        }, 1000);
    }

    private doGetValidacaoAsserts() {
        if (this.systemHolderService.ableMock) {
            this.getValidacaoAssertsMock();
        } else {
            this.getValidacaoAsserts();
        }
    }

    private getValidacaoAsserts() {
        if (this.ordem && this.motivoSelected) {
            this.btnValidarManobraName = "Validando Manobra";
            this.btnValidarManobraDisabled = true;
            this.btnValidarManobraLoading = true;

            this.validadorManobraService
                .getValidacaoAsserts(this.variavelHolderService.cadastro, this.ordem)
                .subscribe(resposta => {
                    resposta[0].forEach(assert => {
                        this.variavelHolderService.cadastro.asserts.push(assert);
                    });
                    resposta[1].forEach(assert => {
                        this.variavelHolderService.cadastro.asserts.push(assert);
                    });
                    this.getAnalitico();
                }, erro => {
                    super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
                    this.btnValidarManobraName = "Validar Manobra";
                    this.btnValidarManobraDisabled = false;
                    this.btnValidarManobraLoading = false;
                    this.apagaInformacoesValidacao();
                });
        } else {
            super.callToasty("Ops, ocorreu um erro.", "Por favor preencha os campos", "error", 5000);
        }
    }

    private getValidacaoAssertsMock() {
        if (this.ordem && this.motivoSelected) {
            this.btnValidarManobraName = "Validando Manobra";
            this.btnValidarManobraDisabled = true;
            this.btnValidarManobraLoading = true;
            setTimeout(() => {
                this.validadorManobraService.getValidacaoAssertsMock().forEach(assert => {
                    this.variavelHolderService.cadastro.asserts.push(assert);
                });
                this.getAnaliticoMock();
            }, 1000);

        } else {
            super.callToasty("Ops, ocorreu um erro.", "Por favor preencha os campos", "error", 5000);
        }
    }

    public enterBtnInput() {
        if (!this.ordem && !this.motivoSelected) {
            this.btnValidarManobraDisabled = true;
        } else {
            this.btnValidarManobraDisabled = false;
        }
    }

    private getAnalitico() {
        this.validadorManobraService
            .getAnalitico(this.variavelHolderService.cadastro, this.motivoSelected)
            .then(resposta => {
                this.variavelHolderService.certificationValidManobraAnalitico = resposta;
                this.analiseIsDone = true;
                this.mountValidatorAlert();
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
                this.apagaInformacoesValidacao();
            })
            .then(() => {
                this.btnValidarManobraName = "Validar Manobra";
                this.btnValidarManobraDisabled = false;
                this.btnValidarManobraLoading = false;
            });
    }

    private getAnaliticoMock() {
        this.variavelHolderService.certificationValidManobraAnalitico = this.validadorManobraService.getAnaliticoMock();
        this.analiseIsDone = true;
        this.mountValidatorAlert();
        this.btnValidarManobraName = "Validar Manobra";
        this.btnValidarManobraDisabled = false;
        this.btnValidarManobraLoading = false;
    }

    public apagaInformacoesValidacao() {
        this.ordem = null;
        this.motivoSelected = null;
    }

    private mountValidatorAlert() {
        if (this.variavelHolderService.certificationValidManobraAnalitico) {
            if (this.variavelHolderService.certificationValidManobraAnalitico.manobrar) {
                let _manobraMotivo = "Liberar manobra - " + this.variavelHolderService.certificationValidManobraAnalitico.conclusao.conclusao.frase + ": " + this.variavelHolderService.certificationValidManobraAnalitico.conclusao.motivo.motivo;
                super.callAlert("alert-success", _manobraMotivo);
            } else {
                let _manobraMotivo = "Manobra negada - Conclusão: " + this.variavelHolderService.certificationValidManobraAnalitico.conclusao.conclusao.frase;
                super.callAlert("alert-danger", _manobraMotivo);
            }
        }
    }


}
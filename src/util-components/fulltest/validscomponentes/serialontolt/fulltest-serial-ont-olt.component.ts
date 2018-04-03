import { Component, OnInit, Input } from '@angular/core';
import { FulltestSerialOntOltService } from './fulltest-serial-ont-olt.service';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { VariavelHolderService } from '../../../../util/holder/variavelholder.service';
import { Valid } from '../../../../viewmodel/valid/valid';
import { ReturnResultSerial } from '../../../../viewmodel/serialontolt/returnresultserial';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'fulltest-serial-ont-olt-component',
    templateUrl: 'fulltest-serial-ont-olt.component.html',
    providers: [FulltestSerialOntOltService]
})

export class FulltestSerialOntOltComponent extends SuperComponentService implements OnInit {

    @Input() public serial: Valid;

    private returnResultSerial: ReturnResultSerial[];

    private serialSelecionado: string;

    private btnUnSetDisabled: boolean = false;
    private btnUnSetName: string = "Desassociar Ont";

    private btnSetDisabled: boolean = false;
    private btnSetName: string = "Associar Ont";

    constructor(private fulltestSerialOntOltService: FulltestSerialOntOltService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (!this.serial.resultado && !this.returnResultSerial) {
            this.unsetOntFromOlt();
        }
    }

    public unsetOntFromOlt() {
        this.btnUnSetDisabled = true;
        this.btnUnSetName = "Aguarde...";
        this.btnSetDisabled = true;
        this.btnSetName = "Aguarde...";
        this.fulltestSerialOntOltService
            .unsetOntFromOlt(this.variavelHolderService.cadastro)
            .then(resultado => {
                this.returnResultSerial = resultado;
                this.serial.resultado = false;
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            }).then(() => {
                this.btnUnSetDisabled = false;
                this.btnUnSetName = "Desassociar Ont";
                this.btnSetDisabled = false;
                this.btnSetName = "Associar Ont";
            });
    }

    public setOntToOlt() {
        if (this.serialSelecionado) {
            this.btnSetDisabled = true;
            this.btnSetName = "Aguarde...";
            this.fulltestSerialOntOltService
                .setOntToOlt(this.variavelHolderService.cadastro, this.serialSelecionado)
                .then(data => {
                    if (data.resultado) {
                        this.serial.resultado = data;
                        this.serial.mensagem = this.serialSelecionado;
                        this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
                    } else {
                        this.callToasty("Ops, ocorreu um erro.", "Não foi possivel associar Ont, resultado voltou como Negativo.", "error", 5000);
                    }
                }, error => {
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                })
                .then(() => {
                    this.btnSetDisabled = false;
                    this.btnSetName = "Associar Ont";
                });
        } else {
            this.callToasty("Ops, ocorreu um erro.", "Por favor selecione serial.", "error", 5000);
        }
    }

}
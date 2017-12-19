import { SerialReturn } from './../../../../../viewmodel/confPorta/return-serial/serial-return';
import { ToastyComponent } from './../../../../toasty/toasty.component';
import { HolderService } from './../../../../holder/holder.service';
import { TableAuxSerialService } from './table-aux-serial.service';
import { Serial } from './../../../../../viewmodel/confPorta/serial';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-serial-component',
    templateUrl: 'table-aux-serial.component.html',
    styleUrls: ['table-aux-serial.component.css'],
    providers: [TableAuxSerialService]
})

export class TableAuxSerialComponent implements OnInit {

    @Input() public serial: Serial;
    @Input() public serialDisp: SerialReturn[];

    private serialReturn: SerialReturn[];

    private btnUnsetOntFromOltDisable: boolean = false;
    private btnUnsetOntFromOltName: string = "Desassociar Ont";

    private serialSelected: string;
    private btnSetOntToOltDisable: boolean = false;
    private btnSetOntToOltName: string = "Associar Ont";

    constructor(
        private tableAuxSerialService: TableAuxSerialService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() {
        if (!this.serial.resultado && !this.serialDisp) {
            this.unsetOntFromOlt();
        }
    }

    public unsetOntFromOlt() {
        this.btnUnsetOntFromOltDisable = true;
        this.btnUnsetOntFromOltName = "Aguarde...";
        this.btnSetOntToOltDisable = true;
        this.btnSetOntToOltName = "Aguarde...";
        this.tableAuxSerialService
            .unsetOntFromOlt(this.holderService.cadastro)
            .then(data => {
                this.serialDisp = data;
                this.serial.resultado = false;
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
            }, error => {
                this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            }).then(() => {
                this.btnUnsetOntFromOltDisable = false;
                this.btnUnsetOntFromOltName = "Desassociar Ont";
                this.btnSetOntToOltDisable = false;
                this.btnSetOntToOltName = "Associar Ont";
            })
    }

    public setOntToOlt() {
        if (this.serialSelected) {
            this.btnSetOntToOltDisable = true;
            this.btnSetOntToOltName = "Aguarde...";
            this.tableAuxSerialService
                .setOntToOlt(this.holderService.cadastro, this.serialSelected)
                .then(data => {
                    if (data.resultado) {
                        this.serial.resultado = data;
                        this.btnSetOntToOltDisable = false;
                        this.btnSetOntToOltName = "Associar Ont";
                        this.serial.mensagem = this.serialSelected;
                        this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000);
                    } else {
                        this.btnSetOntToOltDisable = false;
                        this.btnSetOntToOltName = "Associar Ont";
                        this.callToasty("Ops, ocorreu um erro.", "Não foi possivel associar Ont, resultado voltou como Negativo.", "error", 5000);
                    }
                }, error => {
                    this.btnSetOntToOltDisable = false;
                    this.btnSetOntToOltName = "Associar Ont";
                    this.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
                });
        } else {
            this.callToasty("Ops, ocorreu um erro.", "Por favor selecione serial.", "error", 5000);
        }
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
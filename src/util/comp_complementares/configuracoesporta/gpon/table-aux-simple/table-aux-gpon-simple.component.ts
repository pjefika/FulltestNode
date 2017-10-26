import { ToastyComponent } from './../../../../toasty/toasty.component';
import { HolderService } from './../../../../holder/holder.service';
import { TableAuxGponSimpleService } from './table-aux-gpon-simple.service';
import { EstadoPorta } from './../../../../../viewmodel/confPorta/estadoPorta';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-gpon-simple-component',
    templateUrl: 'table-aux-gpon-simple.component.html',
    styleUrls: ['table-aux-gpon-simple.component.css'],
    providers: [TableAuxGponSimpleService]
})

export class TableAuxGponSimpleComponent implements OnInit {

    private btnChangeAdminStateDisable: boolean = false;
    private btnChangeAdminStateName: string = "Executar";

    @Input() public estadoPorta: EstadoPorta;

    constructor(
        private tableAuxGponSimpleService: TableAuxGponSimpleService,
        private holderService: HolderService,
        private toastyComponent: ToastyComponent) { }

    ngOnInit() { }

    public setAdminState() {
        this.btnChangeAdminStateDisable = true;
        this.btnChangeAdminStateName = "Aguarde...";
        this.tableAuxGponSimpleService
            .setAdminState(this.holderService.cadastro, this.estadoPorta.result)
            .then(data => {
                this.estadoPorta = data;
                this.btnChangeAdminStateDisable = false;
                this.btnChangeAdminStateName = "Executar";
                this.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000)
            }, error => {
                this.btnChangeAdminStateDisable = false;
                this.btnChangeAdminStateName = "Executar";
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
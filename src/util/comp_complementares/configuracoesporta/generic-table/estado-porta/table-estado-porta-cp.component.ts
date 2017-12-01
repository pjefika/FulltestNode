import { Component, OnInit, Input } from '@angular/core';
import { EstadoPorta } from 'viewmodel/confPorta/estadoPorta';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { TableEstadoPortaCpService } from 'util/comp_complementares/configuracoesporta/generic-table/estado-porta/table-estado-porta-cp.service';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'table-estado-porta-cp-component',
    templateUrl: 'table-estado-porta-cp.component.html',
    styleUrls: ['table-estado-porta-cp.component.css'],
    providers: [TableEstadoPortaCpService]
})

export class TableEstadoPortaCpComponent extends CallAlertService implements OnInit {

    @Input() public estadoPorta: EstadoPorta;

    private btnChangeAdminStateDisable: boolean = false;
    private btnChangeAdminStateName: string = "Executar";

    constructor(public toastyComponent: ToastyComponent,
        private tableEstadoPortaCpService: TableEstadoPortaCpService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        //console.log(this.estadoPorta);
    }

    public setAdminState() {
        this.btnChangeAdminStateDisable = true;
        this.btnChangeAdminStateName = "Aguarde...";
        this.tableEstadoPortaCpService
            .setAdminState(this.holderService.cadastro, this.estadoPorta.result)
            .then(data => {
                this.estadoPorta = data;
                this.btnChangeAdminStateDisable = false;
                this.btnChangeAdminStateName = "Executar";
                super.callToasty("Sucesso", "Comando realizado com sucesso.", "success", 5000)
            }, error => {
                this.btnChangeAdminStateDisable = false;
                this.btnChangeAdminStateName = "Executar";
                super.callToasty("Ops, ocorreu um erro.", error.mError, "error", 5000);
            });
    }
}
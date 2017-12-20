import { Component, OnInit, Input } from '@angular/core';
import { EventoMAssivoService } from 'util/comp_complementares/evento-massivo/evento-massivo.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { Evento } from 'viewmodel/evento-massivo/eventos';
import { HolderService } from 'util/holder/holder.service';
import { EventoMassivo } from 'viewmodel/evento-massivo/evento-massivo';

@Component({
    selector: 'evento-massivo-component',
    templateUrl: 'evento-massivo.component.html',
    styleUrls: ['evento-massivo.component.css'],
    providers: [EventoMAssivoService]
})

export class EventoMassivoComponent extends CallAlertService implements OnInit {

    private searching: boolean = false;

    @Input() public eventos: EventoMassivo[];

    constructor(
        public toastyComponent: ToastyComponent,
        private eventoMAssivoService: EventoMAssivoService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        // this.contagemRegressivaParaMostrarTabela();
    }

    private getAfetaCliente() {
        this.searching = true;
        this.eventoMAssivoService
            .getAfetaCliente(this.holderService.cadastro)
            .then(data => {
                this.eventos = data;
            }, error => {
                
            })
            .then(() => {
                this.searching = false;
            })
    }

}
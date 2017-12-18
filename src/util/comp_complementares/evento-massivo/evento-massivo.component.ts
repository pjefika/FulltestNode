import { Component, OnInit } from '@angular/core';
import { EventoMAssivoService } from 'util/comp_complementares/evento-massivo/evento-massivo.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'evento-massivo-component',
    templateUrl: 'evento-massivo.component.html',
    styleUrls: ['evento-massivo.component.css'],
    providers: [EventoMAssivoService]
})

export class EventoMassivoComponent extends CallAlertService implements OnInit {

    private searching: boolean = false;

    constructor(
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.contagemRegressivaParaMostrarTabela();
    }

    private contagemRegressivaParaMostrarTabela() {
        this.searching = true;
        setTimeout(() => {
            this.searching = false;
        }, 1000);
    }
}
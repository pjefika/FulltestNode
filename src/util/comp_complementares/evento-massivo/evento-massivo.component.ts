import { Component, OnInit, Input } from '@angular/core';
import { EventoMAssivoService } from 'util/comp_complementares/evento-massivo/evento-massivo.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { Evento } from 'viewmodel/evento-massivo/eventos';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'evento-massivo-component',
    templateUrl: 'evento-massivo.component.html',
    styleUrls: ['evento-massivo.component.css'],
    providers: [EventoMAssivoService]
})

export class EventoMassivoComponent extends CallAlertService implements OnInit {

    private searching: boolean = false;

    @Input() public eventos: Evento;

    constructor(
        public toastyComponent: ToastyComponent,
        private eventoMAssivoService: EventoMAssivoService,
        private holderService: HolderService) {
        super(toastyComponent);
    }

    public ngOnInit() {
        // this.contagemRegressivaParaMostrarTabela();
    }

    //Mock
    private contagemRegressivaParaMostrarTabela() {
        this.eventos = {
            eventos: [
                {
                    tipoAlarme: "INTERROMPIDO",
                    tipoFalha: "FTTx",
                    tipoAfetacao: "SEM AFETACAO COM RISCO",
                    desc: "PON DOWN: PON 1/1/3/3 Dying Gasp = [0] ::PON LOSS | LOSS= 26",
                    dataAbertura: 1513627226000,
                    dataPrevista: 1513640984000
                }
            ],
            dataConsulta: 1513630092022
        }
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
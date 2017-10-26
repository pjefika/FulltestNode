import { AgrupamentoService } from './agrupamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'agrupamento-component',
    templateUrl: 'agrupamento.component.html',
    styleUrls: ['agrupamento.component.css'],
    providers: [AgrupamentoService]
})

export class AgrupamentoComponent implements OnInit {

    private qualComando: string;

    private consultar: boolean = false;
    private ativar: boolean = false;
    private desativar: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    public comandoSelecionado() {
        switch (this.qualComando) {
            case "consultar":
                this.consultar = true;
                this.ativar = false;
                this.desativar = false;
                break;
            case "ativar":
                this.ativar = true;
                this.consultar = false;
                this.desativar = false;
                break;
            case "desativar":
                this.desativar = true;
                this.consultar = false;
                this.ativar = false;
                break;
        }
    }

}
import { AtivarAgrupamentoService } from './ativar-agrupamento.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ativar-agrupamento-component',
    templateUrl: 'ativar-agrupamento.component.html',
    styleUrls: ['ativar-agrupamento.component.css'],
    providers: [AtivarAgrupamentoService]
})

export class AtivarAgrupamentoComponent implements OnInit {
    @Input() ativo: boolean = false;

    private linha: string;
    private instancias: string[] = [];
    private sizeInstancias: number;

    constructor() { }

    ngOnInit() { }

    public montaListaAgrupamento() {
        if (this.instancias) {
            this.instancias.push(this.linha);
        } else {
            this.instancias = [this.linha];
        }
    }

    public tamanhoArray() {
        this.sizeInstancias = this.instancias.length;
    }

    public criarAgrupamento() {
        //console.log(this.instancias)
    }

}
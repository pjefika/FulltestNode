import { DesativarAgrupamentoService } from './desativar-agrupamento.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'desativar-agrupamento-component',
    templateUrl: 'desativar-agrupamento.component.html',
    styleUrls: ['desativar-agrupamento.component.css'],
    providers: [DesativarAgrupamentoService]
})

export class DesativarAgrupamentoComponent implements OnInit {

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

    public desativarAgrupamento() {
        //console.log(this.instancias)        
    }
}
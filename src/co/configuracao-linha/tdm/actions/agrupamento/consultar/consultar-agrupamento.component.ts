import { ConsultarAgrupamentoService } from './consultar-agrupamento.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'consultar-agrupamento-component',
    templateUrl: 'consultar-agrupamento.component.html',
    styleUrls: ['consultar-agrupamento.component.css'],
    providers: [ConsultarAgrupamentoService]
})

export class ConsultarAgrupamentoComponent implements OnInit {

    @Input() ativo: boolean = false;

    constructor() { }

    ngOnInit() { }
}
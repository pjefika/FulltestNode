import { DesativarAgrupamentoService } from './desativar-agrupamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'desativar-agrupamento-component',
    templateUrl: 'desativar-agrupamento.component.html',
    styleUrls: ['desativar-agrupamento.component.css'],
    providers: [DesativarAgrupamentoService]
})

export class DesativarAgrupamentoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
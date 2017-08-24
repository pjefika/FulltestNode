import { AgrupamentoService } from './agrupamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'agrupamento-component',
    templateUrl: 'agrupamento.component.html',
    styleUrls: ['agrupamento.component.css'],
    providers: [AgrupamentoService]
})

export class AgrupamentoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log("entrou aq")
     }

}
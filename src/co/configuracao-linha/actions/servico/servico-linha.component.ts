import { ServicoLinhaService } from './servico-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'servico-linha-component',
    templateUrl: 'servico-linha.component.html',
    styleUrls: ['servico-linha.component.css'],
    providers: [ServicoLinhaService]
})

export class ServicoLinhaComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
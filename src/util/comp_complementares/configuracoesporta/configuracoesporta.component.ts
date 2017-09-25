import { ConfiguracoesPortaService } from './configuracoesporta.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'configuracoes-porta-component',
    templateUrl: 'configuracoesporta.component.html',
    styleUrls: ['configuracoesporta.component.css'],
    providers: [ConfiguracoesPortaService]
})

export class ConfiguracoesPortaComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }
}
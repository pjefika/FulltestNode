import { ManobraLinhaService } from './manobrar-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'manobrar-linha-component',
    templateUrl: 'manobrar-linha.component.html',
    styleUrls: ['manobrar-linha.component.css'],
    providers: [ManobraLinhaService]
})

export class ManobrarLinhaComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }
}
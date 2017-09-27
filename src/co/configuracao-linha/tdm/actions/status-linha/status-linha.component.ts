import { StatusLinhaService } from './status-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'status-linha-component',
    templateUrl: 'status-linha.component.html',
    styleUrls: ['status-linha.component.css'],
    providers: [StatusLinhaService]
})

export class StatusLinhaComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
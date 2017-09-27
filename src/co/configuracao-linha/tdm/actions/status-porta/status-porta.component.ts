import { StatusPortaService } from './status-porta.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'status-porta-component',
    templateUrl: 'status-porta.component.html',
    styleUrls: ['status-porta.component.css'],
    providers: [StatusPortaService]
})

export class StatusPortaComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
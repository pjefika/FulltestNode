import { LinhaService } from './linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'linha-component',
    templateUrl: 'linha.component.html',
    styleUrls: ['linha.component.css'],
    providers: [LinhaService]
})

export class LinhaComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
    
}
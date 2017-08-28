import { NcosService } from './ncos.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ncos-component',
    templateUrl: 'ncos.component.html',
    styleUrls: ['ncos.component.css'],
    providers: [NcosService]
})

export class NcosComponent implements OnInit {

    private newncos: string;

    constructor() { }

    ngOnInit() { }

    public setNcos() {
        
    }
}
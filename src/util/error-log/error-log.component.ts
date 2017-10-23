import { HolderService } from './../holder/holder.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'error-log-component',
    templateUrl: 'error-log.component.html',
    styleUrls: ['error-log.component.css']
})

export class ErrorLogComponent implements OnInit {

    constructor(
        public holderService: HolderService) { }

    ngOnInit() { }

}
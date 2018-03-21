import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util/util.service';

@Component({
    templateUrl: 'principal.component.html',
    styleUrls: ['principal.component.css']
})

export class PrincipalComponent implements OnInit {

    private version: string;

    constructor(public util: UtilService) { }

    public ngOnInit() {
        this.getVersion();
    }

    private getVersion() {
        this.version = this.util.getVersion();
    }
}
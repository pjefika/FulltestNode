import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-level-alert-component',
    templateUrl: 'applevelalert.component.html',
    styleUrls: ['applevelalert.component.css']
})

export class AppLevelAlertComponent implements OnInit {

    private alertType: string;
    private alertAtivo: boolean = false;

    constructor() { }

    public ngOnInit() { }
}
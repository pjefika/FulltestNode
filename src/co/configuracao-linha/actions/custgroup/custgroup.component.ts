import { CustgroupService } from './custgroup.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'custgroup-component',
    templateUrl: 'custgroup.component.html',
    styleUrls: ['custgroup.component.css'],
    providers: [CustgroupService]
})

export class CustgroupComponent implements OnInit {

    private newcustgroup: string;

    constructor() { }

    ngOnInit() { }

    public setCustgroup() {
        console.log(this.newcustgroup);

    }
}
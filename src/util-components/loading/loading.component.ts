import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'loading-component',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})

export class LoadingComponent implements OnInit {

    @Input() searchWhat: string;
    @Input() searching: boolean;

    constructor() { }

    ngOnInit() { }
}
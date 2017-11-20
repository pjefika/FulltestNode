import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'button-component',
    templateUrl: 'button.component.html'
})

export class ButtonComponent implements OnInit {

    @Input() public classBtn: string;

    @Input() public nameBtn: boolean = false;

    @Input() public loading?: boolean = false;

    constructor() { }

    public ngOnInit() { }

}
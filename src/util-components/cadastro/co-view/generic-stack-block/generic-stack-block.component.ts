import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'generic-stack-block',
    templateUrl: 'generic-stack-block.component.html',
})

export class GenericStackBlockComponent implements OnInit {

    @Input() public obj: any;

    constructor() { }

    public ngOnInit() { }


}
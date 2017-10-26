import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'dynamic-router-component',
    templateUrl: 'dynamic-router.component.html',
    styleUrls: ['dynamic-router.component.css']
})

export class DynamicRouterComponent implements OnInit, OnChanges {

    @Input() public component: any;
    private componentData: any;

    constructor() { }

    public ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
        this.setDynamicComponent();
    }

    private setDynamicComponent() {
        this.componentData = {
            component: this.component,
            inputs: {
                nothing: null
            }
        }
    }

}
import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../toasty/toasty.component';
import { SystemHolderService } from '../../util/holder/systemHolder.service';

@Component({
    selector: 'manobrar-component',
    templateUrl: 'manobrar.component.html'
})

export class ManobrarComponent extends SuperComponentService implements OnInit {

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }

}
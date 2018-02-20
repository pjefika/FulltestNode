import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';
import { Valid } from '../../../../viewmodel/valid/valid';

@Component({
    selector: 'fulltest-profile-component',
    templateUrl: 'fulltest-profile.component.html'
})

export class FulltestProfileComponent extends SuperComponentService implements OnInit {

    @Input() public profile: Valid;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() { }
    public stringVelocidade(vel: string) {
        let vels = vel.match("[^a-z_ ]\\ *([.0-9])*\\d");
        return vels[0];
    }

}
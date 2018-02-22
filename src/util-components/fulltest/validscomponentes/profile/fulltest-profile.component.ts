import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../../toasty/toasty.component';
import { SystemHolderService } from '../../../../util/holder/systemHolder.service';
import { Valid } from '../../../../viewmodel/valid/valid';
import { Profile } from '../../../../viewmodel/confporta/profile';

@Component({
    selector: 'fulltest-profile-component',
    templateUrl: 'fulltest-profile.component.html'
})

export class FulltestProfileComponent extends SuperComponentService implements OnInit {

    @Input() public profile: Valid;

    @Input() public profileConfPorta?: Profile;

    constructor(public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        if (this.profileConfPorta && !this.profile) {
            this.profile = this.profileConfPorta.atual;
        }
    }

    public stringVelocidade(vel: string) {
        let vels = vel.match("[^a-z_ ]\\ *([.0-9])*\\d");
        return vels[0];
    }

}
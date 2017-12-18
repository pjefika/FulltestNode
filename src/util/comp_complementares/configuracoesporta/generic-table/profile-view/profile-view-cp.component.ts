import { Component, OnInit, Input } from '@angular/core';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ProfileAtual } from 'viewmodel/confPorta/profileAtual';

@Component({
    selector: 'profile-view-cp',
    templateUrl: 'profile-view-cp.component.html',
    styleUrls: ['profile-view-cp.component.css']
})

export class ProfileViewCpComponent extends CallAlertService implements OnInit {

    @Input() public profile: ProfileAtual;

    constructor(public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { 
        
    }

}
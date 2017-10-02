import { Profile } from './../../../../../viewmodel/confPorta/profiles';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'table-aux-profile-component',
    templateUrl: 'table-aux-profile.component.html',
    styleUrls: ['table-aux-profile.component.css']
})

export class TableAuxProfileComponent implements OnInit {

    private changeProfile: boolean = false;

    @Input() public profile: Profile;

    constructor() { }

    ngOnInit() { }
}
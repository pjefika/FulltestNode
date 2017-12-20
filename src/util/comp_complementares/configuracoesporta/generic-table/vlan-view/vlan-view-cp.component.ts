import { Component, OnInit, Input } from '@angular/core';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { VlanAbstract } from 'viewmodel/confPorta/vlanAbstract';

@Component({
    selector: 'vlan-view-cp',
    templateUrl: 'vlan-view-cp.component.html',
    styleUrls: ['vlan-view-cp.component.css']
})

export class VlanViewCpComponent extends CallAlertService implements OnInit {

    @Input() public vlan: VlanAbstract;

    constructor(public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() { 
        
    }

}
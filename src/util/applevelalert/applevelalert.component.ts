import { HolderService } from 'util/holder/holder.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-level-alert-component',
    templateUrl: 'applevelalert.component.html',
    styleUrls: ['applevelalert.component.css']
})

export class AppLevelAlertComponent implements OnInit {

    constructor(
        public holderService: HolderService) { }

    public ngOnInit() { }


    private actionButton() {
        if (this.holderService.appLevelAlert.buttonAction === "refresh") {
            this.pageRefresh();
        }
    }


    private pageRefresh() {
        window.location.reload();
    }


}
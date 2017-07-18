import { HolderService } from './../../util/holder/holder.service';
import { Util } from './../../util/util';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'toggle-component',
    templateUrl: 'toggle.component.html',
    styleUrls: ['toggle.component.css']
})

export class ToggleComponent implements OnInit {

    modalToggle: boolean = false;

    eachFulltest: string;

    constructor(
        private router: Router,
        private util: Util,
        private holderService: HolderService) { }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }

    hitclose() {
        this.holderService.eachFulltest = this.eachFulltest;
    }
}
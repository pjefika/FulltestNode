import { Router } from '@angular/router';
import { Util } from './../../util/util';
import { ComplementaresService } from './complementares.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'complementares-component',
    templateUrl: 'complementares.component.html',
    styleUrls: ['complementares.component.css']
})

export class ComplementaresComponent implements OnInit {
    constructor(
        private util: Util,
        private router: Router,
        private complementaresService: ComplementaresService) { }

    ngOnInit() {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }
}
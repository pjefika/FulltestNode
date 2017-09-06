import { Util } from './../util/util';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from "clarity-angular";

@Component({
    templateUrl: 'principal.component.html',
    styleUrls: ['principal.component.css']
})

export class PrincipalComponent implements OnInit {

    constructor(private router: Router, private util: Util) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./entrar']);
            }
        });
    }

}
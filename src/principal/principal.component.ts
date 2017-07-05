import { Util } from './../util/util';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from "clarity-angular";

@Component({
    templateUrl: 'principal.component.html',
    styleUrls: ['principal.component.css']
})

export class PrincipalComponent implements OnInit {

    @ViewChild("wizardlg") wizard: Wizard;

    constructor(private router: Router, private util: Util) { }

    imgbusca = "./assets/imagens/bemvindo.png";
    imgcadastro = "./assets/imagens/cadastro.png";
    imgfulltest = "./assets/imagens/fulltest.png";

    mdOpen: boolean = false;

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
    }

}
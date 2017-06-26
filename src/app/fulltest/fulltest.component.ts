import { CadastroComponent } from './../cadastro/cadastro.component';
import { FulltestService } from './fulltest.service';
import { Router } from '@angular/router';
import { Util } from './../util/util';
import { ObjectValid } from './../viewmodel/objectValid';
import { Cadastro } from './../viewmodel/cadastro';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: "full-test-component",
    templateUrl: 'fulltest.component.html',
    styleUrls: ['fulltest.component.css']
})

export class FulltestComponent implements OnInit {

    @Input() cadastro: Cadastro;
    objectValid: ObjectValid;
    
    searchFulltest: boolean = false;
    alertTypeOn: boolean = false;
    doFulltest: boolean = false;

    msg: {
        alertType: string,
        alertMesage: string
    }

    constructor(private fulltestService: FulltestService, private util: Util, private router: Router, private cadastroComponent: CadastroComponent) { }

    ngOnInit(): void {
        this.util.isLogado().then((result: boolean) => {
            if (!result) {
                this.router.navigate(['./fulltest/entrar']);
            }
        });
        this.realizaFulltest();
    }

    realizaFulltest(): void {
        this.searchFulltest = true;
        this.fulltestService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
            }, error => {
                this.searchFulltest = false;                
                if (error.tError !== "Timeout") {
                    this.doFulltest = true;
                }
                this.msg = {
                    alertType: "alert-danger",
                    alertMesage: error.mError
                }
                this.cadastroComponent.alertTypeOn = true;
                this.cadastroComponent.msg = this.msg;
            })
    }
}
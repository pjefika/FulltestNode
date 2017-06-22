import { CadastroService } from './../cadastro/cadastro.service';
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

    informAlertType: string;
    mensagemAlert: string;
    error: {
        message: string;
    }
    msg: {
        alertType: string,
        alertMesage: string
    }

    constructor(private cadastroService: CadastroService, private util: Util, private router: Router) { }

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
        this.cadastroService
            .getValidacao(this.cadastro)
            .then(data => {
                this.objectValid = data;
                this.searchFulltest = false;
            }, error => {
                this.searchFulltest = false;
                this.alertTypeOn = true;
                this.doFulltest = true;
                this.error = error.json();
                this.msg = {
                    alertType: "alert-danger",
                    alertMesage: this.error.message
                }
            })
    }

}
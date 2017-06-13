import { Component, Injector, Input } from '@angular/core';

import { CadastroService } from './cadastro.service';

import { Cadastro } from '../viewmodel/cadastro';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css']
})

export class CadastroComponent {
    constructor(private cadastroService: CadastroService) { }

    cadastro: Cadastro;
    instancia: string = "4131543457";
    searching: boolean = false;

    getCadastro(): void {

        this.searching = true;
        this.cadastroService.getCadastro(this.instancia).then(
            data => {                
                this.cadastro = data
                this.searching = false;
                //console.log(this.cadastro);
            },
            error => {
                console.log("erro");
            });
    }

}
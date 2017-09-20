import { HolderService } from './../../../../util/holder/holder.service';
import { LinhaService } from './linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'linha-component',
    templateUrl: 'linha.component.html',
    styleUrls: ['linha.component.css'],
    providers: [LinhaService]
})

export class LinhaComponent implements OnInit {

    private instanciaBinada: string;
    private listLens = [];
    private qualLen: string;
    public qualComando: string;

    private criarLinha: boolean = false;
    private deletarLinha: boolean = false;

    constructor(
        private holderService: HolderService) { }

    public ngOnInit() {
        if (this.holderService.cadastroLinha.status == "NOT_CREATED") {
            this.qualComando = "criar";
            this.comandoSelecionado();
        }
    }

    public comandoSelecionado() {
        switch (this.qualComando) {
            case "criar":
                this.criarLinha = true;
                this.deletarLinha = false;
                break;
            case "deletar":
                this.deletarLinha = true;
                this.criarLinha = false;
                break;
        }
    }

}